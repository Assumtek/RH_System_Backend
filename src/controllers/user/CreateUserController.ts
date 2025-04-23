import { Request, Response } from "express"
import { CreateUserService } from "../../services/user/CreateUserService"
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

export class CreateUserController {
    async handle(req: Request, res: Response) {
        try {
            console.log("Iniciando criação de usuário");

            const { name, Modality, email, password, phoneNumber, role, contrato, cidade, nascimento, CPF, RG } = req.body;

            const createUserService = new CreateUserService();

            if (!req.files || Object.keys(req.files).length === 0) {
                console.log("Nenhum arquivo enviado para upload.");
                throw new Error("Erro ao enviar arquivo de imagem.");
            } else {
                // Enviar a imagem para a API do Cloudinary
                const file: any = req.files['photourl'];

                const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({}, function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result);
                    }).end(file.data);
                });

                console.log("Arquivo enviado para o Cloudinary:", resultFile);

                const user = await createUserService.execute({
                    name,
                    email,
                    password,
                    phoneNumber,
                    role,
                    profilePhoto: resultFile.url,
                    contrato,
                    cidade,
                    nascimento,
                    CPF,
                    RG,
                    Modality
                });

                console.log("Usuário criado com sucesso:", user);

                return res.json(user);
            }
        } catch (error: any) {
            console.error("Erro ao criar usuário:", error.message, error.stack);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro interno no servidor."
            });
        }
    }
}
