import  prismaClient  from "../../prisma"

interface ItemRequest {
    presenceday_id: string
}

class DeletePreszenceDayService {
  async execute({ presenceday_id }: ItemRequest) {
      
    const presenceday = await prismaClient.presenceDay.delete({
      where: {
        id: presenceday_id
      }
    })

    return presenceday
  }
}

export { DeletePreszenceDayService }