import { Request, Response } from "express"
import { ContTimeService } from "../../services/Attendance/ContTimeService"

export class ContTimeController {
    async handle(req: Request, res: Response) {

        const { userId, contract } = req.body

        
        const contTimeService = new ContTimeService()

        const registro = await contTimeService.execute({
            userId,
            contract
        })
        
        return res.json(registro)
    }
  }