import prismaClient from "../../prisma";

interface EditReq {
  user_id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  Modality?: string;
  contrato?: string;
  cidade?: string;
  nascimento?: string;
  CPF?: string;
  RG?: string;
}

class EditUserService {
  async execute({
    user_id,
    name,
    email,
    phoneNumber,
    role,
    Modality,
    contrato,
    cidade,
    nascimento,
    CPF,
    RG,
  }: EditReq) {
    console.log("Atualizando usuário com ID:", user_id);

    // Valida os campos obrigatórios
    if (!user_id || !name || !email) {
      throw new Error("Campos obrigatórios não foram fornecidos");
    }

    // Busca o usuário pelo ID
    const user = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    console.log("Usuário encontrado, atualizando...");

    // Atualiza os dados do usuário
    const updatedUser = await prismaClient.user.update({
      where: { id: user_id },
      data: {
        name,
        email,
        phoneNumber,
        role,
        Modality,
        contrato,
        cidade,
        nascimento,
        CPF,
        RG,
      },
    });

    console.log("Usuário atualizado com sucesso:", updatedUser);

    return updatedUser;
  }
}

export { EditUserService };
