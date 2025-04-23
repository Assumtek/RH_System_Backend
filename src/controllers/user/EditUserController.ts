import { Request, Response } from "express";
import { EditActiveUserService } from "../../services/user/EditActiveUserService";
import { EditUserService } from "../../services/user/EditUserService";

export class EditUserController {
    async handle(req: Request, res: Response) {

        const { user_id,
            name,
            email,
            phoneNumber,
            role,
            Modality,
            contrato,
            cidade,
            nascimento,
            CPF,
            RG
        } = req.body

        const editUserService = new EditUserService()

        console.log("Iniciar a edição")

        const editUser = await editUserService.execute({
            user_id,
            name,
            email,
            phoneNumber,
            role,
            Modality,
            contrato,
            cidade,
            nascimento,
            CPF,
            RG
        })

        res.json(editUser)
    }
}