import { Router } from 'express'

// Middlewares
import { isAuthenticated } from '../middlewares/isAuthenticated'

// Controllers
import { 
  listPresenceDays, 
  createPresenceDay, 
  deletePresenceDay 
} from '../controllers/presenceday.controller'

const presenceDayRouter = Router()

// Listar todos os dias de presença
presenceDayRouter.get('/', isAuthenticated, listPresenceDays)

// Criar um novo dia de presença (com userId como parâmetro de rota)
presenceDayRouter.post('/:userId', isAuthenticated, createPresenceDay)

// Excluir um dia de presença
presenceDayRouter.delete('/', isAuthenticated, deletePresenceDay)

export { presenceDayRouter } 