import { Request, Response } from "express";
import { createAttendanceService, countTimeService } from "../services/Attendance/attendance.service";

// Criar registro de ponto
export const createAttendance = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, type } = req.body;

    const attendance = await createAttendanceService({
      userId,
      type
    });

    return res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message || "Erro ao registrar o ponto" });
  }
};

// Calcular tempo trabalhado (usando userId da rota e contract do query param)
export const countTime = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId;
    const contract = req.query.contract as string;

    if (!userId) {
      throw new Error("Parâmetro userId é obrigatório");
    }
    
    if (!contract) {
      throw new Error("Parâmetro contract é obrigatório");
    }

    const timeCount = await countTimeService({
      userId,
      contract
    });

    return res.status(200).json(timeCount);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message || "Erro ao calcular o tempo" });
  }
}; 