import prismaClient from "../../prisma"

class ListPresenceDayService {
    async execute(){

        const listPresenceDays = prismaClient.presenceDay.findMany({
            orderBy: {
                day: 'asc',
            },
            include: {
                user: true
            }
        })

        return listPresenceDays
    }
}

export {ListPresenceDayService}