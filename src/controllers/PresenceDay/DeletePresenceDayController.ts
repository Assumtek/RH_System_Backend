import { Request, Response } from "express";
import { DeletePreszenceDayService } from "../../services/PresenceDay/DeletePreszenceDayService";

class DeletePresenceDayController {
  async handle(req: Request, res: Response) {
    const presenceday_id = req.query.presenceday_id as string

    console.log(presenceday_id)

    const deletePreszenceDayService = new DeletePreszenceDayService()

    const preszenceDay = await deletePreszenceDayService.execute({ presenceday_id })

    return res.json(preszenceDay)
  }
}

export { DeletePresenceDayController }