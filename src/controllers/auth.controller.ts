import { Request, Response } from "express"
import { authenticateService, getUserDetailsService } from "../services/auth/auth.service"

// Login de usuário
export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body
        
        const user = await authenticateService({
            email,
            password
        })
        
        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: error.message || "Erro ao realizar login" })
    }
}

// Detalhes do usuário logado
export const me = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user_id = req.user_id

        const user = await getUserDetailsService(user_id)

        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erro ao buscar detalhes do usuário" })
    }
} 