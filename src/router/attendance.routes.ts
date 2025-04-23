import { Router } from 'express'

// Middlewares
import { isAuthenticated } from '../middlewares/isAuthenticated'

// Controllers
import { createAttendance, countTime } from '../controllers/attendance.controller'

const attendanceRouter = Router()

// Cria um registro de ponto
attendanceRouter.post('/', isAuthenticated, createAttendance)

// Calcula tempo trabalhado (usando :userId como parâmetro de rota e contract como query param)
attendanceRouter.get('/time/:userId', isAuthenticated, countTime)

export { attendanceRouter } 