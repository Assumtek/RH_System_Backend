import { hash, genSalt } from 'bcryptjs'
import prismaClient from "../../prisma"

interface UserRequest {
  userId: string
  day: string
  type: string
  description: string 
  title: any 
}

class CreatePresenceDayService {
  async execute({ userId, day, type, description, title}: UserRequest) {

    // Verifica se tem alguim campo vazio
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
}

export { CreatePresenceDayService }