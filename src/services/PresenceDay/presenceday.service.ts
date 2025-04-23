import prismaClient from "../../prisma"

// Interfaces
interface CreatePresenceDayRequest {
  userId: string
  day: string
  type: string
  description: string 
  title: any 
}

interface DeletePresenceDayRequest {
  presenceday_id: string
}

// Serviço para listar todos os dias de presença
export const listPresenceDaysService = async () => {
  const listPresenceDays = await prismaClient.presenceDay.findMany({
    orderBy: {
      day: 'asc',
    },
    include: {
      user: true
    }
  })

  return listPresenceDays
}

// Serviço para criar um novo dia de presença
export const createPresenceDayService = async ({ 
  userId, 
  day, 
  type, 
  description, 
  title
}: CreatePresenceDayRequest) => {
  // Verifica se tem algum campo vazio
  if (!userId) {
    throw new Error("User não enviado")
  }
  if (!title) {
    throw new Error("Titulo não enviado")
  }
  if (!day) {
    throw new Error("Data não enviado")
  }
  if (!type) {
    throw new Error("Tipo não enviado")
  }
  if (!description) {
    throw new Error("Descrição não enviado")
  }

  // Cria o registro do dia presencial
  const presenceDay = await prismaClient.presenceDay.create({
    data: {
      userId,
      day: new Date(day), // Armazena a data enviada
      type: type,
      description: description,
      title: title
    },
  });

  return presenceDay
}

// Serviço para excluir um dia de presença
export const deletePresenceDayService = async ({ presenceday_id }: DeletePresenceDayRequest) => {
  const presenceday = await prismaClient.presenceDay.delete({
    where: {
      id: presenceday_id
    }
  })

  return presenceday
} 