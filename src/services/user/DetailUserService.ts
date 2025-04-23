import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: { id: user_id },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                role: true,
                active: true,
                profilePhoto: true,
                Attendance: true,
                PresenceDay: true,
                password: true,
                createdAt: true,
                cidade: true,
                contrato: true,
                CPF: true,
                nascimento: true,
                RG: true
            }
        })

        return user
    }
}

export { DetailUserService }