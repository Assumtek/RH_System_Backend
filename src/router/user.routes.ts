import { Router } from 'express'

// Middlewares
import { isAuthenticated } from '../middlewares/isAuthenticated'

// Controllers
import { 
  createUser, 
  editUser, 
  toggleUserActive, 
  listUsers 
} from '../controllers/user.controller'

const userRouter = Router()

// Cria um novo usuário
userRouter.post('/', createUser)

// Lista todos os usuários
userRouter.get('/', isAuthenticated, listUsers)

// Ativa/desativa um usuário
userRouter.post('/edit', isAuthenticated, toggleUserActive)

// Edita um usuário
userRouter.post('/edit/all', isAuthenticated, editUser)

export { userRouter } 