import { Router } from 'express'

// Middlewares
import { isAuthenticated } from '../middlewares/isAuthenticated'

// Controllers
import { createAttendance, countTime } from '../controllers/attendance.controller'

const attendanceRouter = Router()

// Cria um registro de ponto
attendanceRouter.post('/', isAuthenticated, createAttendance)

// Calcula tempo trabalhado
attendanceRouter.post('/time', isAuthenticated, countTime)

export { attendanceRouter } 