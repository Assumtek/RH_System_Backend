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

// Ativa/desativa um usuário (com userId como parâmetro de rota)
userRouter.post('/edit/:userId', isAuthenticated, toggleUserActive)

// Edita um usuário (com userId como parâmetro de rota, sem o /all)
userRouter.put('/:userId', isAuthenticated, editUser)

export { userRouter } 