import { Request, Response } from "express";
import { ListPresenceDayService } from "../../services/PresenceDay/ListPresenceDayService";

export class ListePresenceDayController{
    async handle(req: Request, res: Response){

        const listPresenceDayService = new ListPresenceDayService()

        const listPresenceDay = await listPresenceDayService.execute()
        
        res.json(listPresenceDay)
    }
}