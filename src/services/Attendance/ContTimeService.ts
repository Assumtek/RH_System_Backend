import prismaClient from "../../prisma";

interface UserRequest {
  userId: string;
  contract: string; // "CLT" ou "PJ"
}

class ContTimeService {
  async execute({ userId, contract }: UserRequest) {
    // Verifica se os campos userId e contract estão vazios
    if (!userId) {
      throw new Error("User não enviado");
    }
    if (!contract || (contract !== "CLT" && contract !== "PJ")) {
      throw new Error("Contrato inválido");
    }

    // Calcular o intervalo dos últimos 30 dias
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    // Buscar registros do usuário no intervalo de 30 dias
    const registros = await prismaClient.attendance.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: trintaDiasAtras,
          lte: hoje,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!registros || registros.length === 0) {
      throw new Error("Nenhum registro encontrado para o usuário nos últimos 30 dias.");
    }

    // Agrupar registros por dia
    const registrosPorDia = registros.reduce<Record<string, typeof registros>>((acc, registro) => {
      const data = registro.createdAt.toISOString().split("T")[0];
      if (!acc[data]) acc[data] = [];
      acc[data].push(registro);
      return acc;
    }, {});

    // Variáveis para total geral e inconsistências
    let totalHoras = 0;
    let totalMinutos = 0;
    const inconsistencias: string[] = []; // Lista de dias com inconsistências

    // Processar os registros com base no contrato
    Object.entries(registrosPorDia).forEach(([data, registros]) => {
      let totalHorasDia = 0;
      let totalMinutosDia = 0;
      let registrosSemPar: typeof registros = [];

      if (contract === "CLT") {
        // Processar registros para contrato CLT
        let entradaGeral = null;
        let entradaAlmoco = null;
        let saidaAlmoco = null;
        let saidaGeral = null;

        registros.forEach((registro) => {
          switch (registro.type) {
            case "Entrada geral":
              entradaGeral = registro;
              break;
            case "Entrada almoço":
              entradaAlmoco = registro;
              break;
            case "Saída do almoço":
              saidaAlmoco = registro;
              break;
            case "Saída geral":
              saidaGeral = registro;
              break;
          }
        });

        if (entradaGeral && entradaAlmoco) {
          const diffMs = new Date(entradaAlmoco.createdAt).getTime() - new Date(entradaGeral.createdAt).getTime();
          totalHorasDia += Math.floor(diffMs / 3600000);
          totalMinutosDia += Math.floor((diffMs % 3600000) / 60000);
        }

        if (saidaAlmoco && saidaGeral) {
          const diffMs = new Date(saidaGeral.createdAt).getTime() - new Date(saidaAlmoco.createdAt).getTime();
          totalHorasDia += Math.floor(diffMs / 3600000);
          totalMinutosDia += Math.floor((diffMs % 3600000) / 60000);
        }

        // Adicionar inconsistências se houver pontos faltantes
        if (!entradaGeral || !entradaAlmoco || !saidaAlmoco || !saidaGeral) {
          inconsistencias.push(data);
        }
      } else if (contract === "PJ") {
        // Processar registros para contrato PJ
        for (let i = 0; i < registros.length; i += 2) {
          const inicio = registros[i];
          const termino = registros[i + 1];

          if (
            inicio &&
            termino &&
            inicio.type === "Começo" &&
            termino.type === "Fim"
          ) {
            const diffMs = new Date(termino.createdAt).getTime() - new Date(inicio.createdAt).getTime();
            totalHorasDia += Math.floor(diffMs / 3600000); // Horas inteiras
            totalMinutosDia += Math.floor((diffMs % 3600000) / 60000); // Minutos restantes
          } else {
            if (inicio && inicio.type === "Começo") registrosSemPar.push(inicio);
            if (termino && termino.type === "Fim") registrosSemPar.push(termino);
          }
        }

        // Adicionar inconsistências se houver registros sem par
        if (registrosSemPar.length > 0) {
          inconsistencias.push(data);
        }
      }

      // Normalizar minutos excedentes em horas
      if (totalMinutosDia >= 60) {
        totalHorasDia += Math.floor(totalMinutosDia / 60);
        totalMinutosDia = totalMinutosDia % 60;
      }

      // Somar ao total geral
      totalHoras += totalHorasDia;
      totalMinutos += totalMinutosDia;
    });

    // Normalizar minutos excedentes no total geral
    if (totalMinutos >= 60) {
      totalHoras += Math.floor(totalMinutos / 60);
      totalMinutos = totalMinutos % 60;
    }

    // Retornar o total e as inconsistências
    return {
      totalHoras,
      totalMinutos,
      inconsistencias,
    };
  }
}

export { ContTimeService };
