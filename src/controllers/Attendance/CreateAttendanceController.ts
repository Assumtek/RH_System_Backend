import { Request, Response } from "express"
import { CreatePresenceDayService } from "../../services/PresenceDay/CreatePresenceDayService"
import { CreateAttendenceService } from "../../services/Attendance/CreateAttendenceService"

export class CreateAttendanceController {
    async handle(req: Request, res: Response) {

        const { userId, type } = req.body

        
        const createAttendenceService = new CreateAttendenceService()

        const attendence = await createAttendenceService.execute({
            userId, 
            type
        })
        
        return res.json(attendence)
    }
  }