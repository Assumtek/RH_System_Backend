import { Request, Response } from "express";
import { 
  listPresenceDaysService, 
  createPresenceDayService, 
  deletePresenceDayService 
} from "../services/PresenceDay/presenceday.service";

// Listar todos os dias de presença
export const listPresenceDays = async (req: Request, res: Response): Promise<Response> => {
  try {
    const presenceDays = await listPresenceDaysService();
    
    return res.status(200).json(presenceDays);
  } catch (error) {
    console.error("Erro ao listar dias de presença:", error);
    return res.status(500).json({ 
      message: error.message || "Erro ao listar dias de presença"
    });
  }
};

// Criar um novo dia de presença
export const createPresenceDay = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, day, type, description, title } = req.body;
    
    const presenceDay = await createPresenceDayService({
      userId, 
      day,
      type, 
      description,
      title
    });
    
    return res.status(201).json(presenceDay);
  } catch (error) {
    console.error("Erro ao criar dia de presença:", error);
    return res.status(400).json({ 
      message: error.message || "Erro ao criar dia de presença"
    });
  }
};

// Excluir um dia de presença
export const deletePresenceDay = async (req: Request, res: Response): Promise<Response> => {
  try {
    const presenceday_id = req.query.presenceday_id as string;
    
    if (!presenceday_id) {
      throw new Error("ID do dia de presença não fornecido");
    }
    
    const deletedPresenceDay = await deletePresenceDayService({
      presenceday_id
    });
    
    return res.status(200).json(deletedPresenceDay);
  } catch (error) {
    console.error("Erro ao excluir dia de presença:", error);
    return res.status(400).json({ 
      message: error.message || "Erro ao excluir dia de presença"
    });
  }
}; 