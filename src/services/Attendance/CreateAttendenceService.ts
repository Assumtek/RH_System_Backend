import prismaClient from "../../prisma"

interface UserRequest {
  userId: string
  type: string
}

class CreateAttendenceService {
  async execute({ userId, type}: UserRequest) {

    // Verifica se tem alguim campo vazio
    if (!userId) {
      throw new Error("User não enviado")
    }
    if (!type) {
      throw new Error("Tipo não enviado")
    }

    // Cria o registro do ponto
    const attendance = await prismaClient.attendance.create({
      data: {
        userId,
        type, 
      },
    });

    return attendance

  }
}

export { CreateAttendenceService }