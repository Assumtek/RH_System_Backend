import prismaClient from "../../prisma"

class ListUserService {
    async execute(){

        const listUsers = prismaClient.user.findMany({
            orderBy: {
                name: 'asc',
            },
            include: {
                Attendance: true,
                PresenceDay: true
            }
        }) 

        return listUsers
    }
}

export {ListUserService}