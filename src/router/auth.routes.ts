import { Router } from 'express'

// Middlewares
import { isAuthenticated } from '../middlewares/isAuthenticated'

// Controllers
import { login, me } from '../controllers/auth.controller'

const authRouter = Router()

// Faz a autenticação de login do usuário
authRouter.post('/login', login)
// Pega os detalhes do usuário logado
authRouter.get('/me', isAuthenticated, me)

export { authRouter } 