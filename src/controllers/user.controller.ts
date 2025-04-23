import { Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { 
  createUserService, 
  editUserService, 
  editActiveUserService, 
  listUsersService 
} from "../services/user/user.service";

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Criar novo usuário
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { 
      name, 
      Modality, 
      email, 
      password, 
      phoneNumber, 
      role, 
      contrato, 
      cidade, 
      nascimento, 
      CPF, 
      RG 
    } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error("Erro ao enviar arquivo de imagem.");
    }
    
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

    const user = await createUserService({
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

    return res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(400).json({ 
      message: error.message || "Erro ao criar usuário"
    });
  }
};

// Editar usuário
export const editUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { 
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
    } = req.body;

    const updatedUser = await editUserService({
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
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    return res.status(400).json({ 
      message: error.message || "Erro ao editar usuário"
    });
  }
};

// Ativar/desativar usuário
export const toggleUserActive = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id } = req.body;

    const updatedUser = await editActiveUserService({
      user_id
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao ativar/desativar usuário:", error);
    return res.status(400).json({ 
      message: error.message || "Erro ao ativar/desativar usuário"
    });
  }
};

// Listar todos os usuários
export const listUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await listUsersService();
    
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ 
      message: error.message || "Erro ao listar usuários"
    });
  }
}; 