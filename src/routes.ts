import { Request, Response, Router } from 'express'

// Middlewares
import { isAuthenticated } from './middlewares/isAuthenticated'

// Controllers
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { EditActiveUserController } from './controllers/user/EditActiveUserController'
import { ListUserContoller } from './controllers/user/ListeUserController'
import { ListePresenceDayController } from './controllers/PresenceDay/ListePresenceDayController'
import { CreatePresenceDayController } from './controllers/PresenceDay/CreatePresenceDayController'
import { DeletePresenceDayController } from './controllers/PresenceDay/DeletePresenceDayController'
import { CreateAttendanceController } from './controllers/Attendance/CreateAttendanceController'
import { ContTimeController } from './controllers/Attendance/CountTimeController'
import { EditUserController } from './controllers/user/EditUserController'
const router = Router()

// Configuração do envio de arquivos
router.get('/', (req: Request, res: Response) => {
  return res.send(`
    <h1 style='font-family: sans-serif'>
        API HRsysten!!!
    <h1>
  `)
})

// USER //

// Cria um novo usuario
router.post('/users', new CreateUserController().handle)
// Pega todos os usuarios e seus cursos
router.get('/users', isAuthenticated, new ListUserContoller().handle)
// Desativa um usuario
router.post('/users/edit', isAuthenticated, new EditActiveUserController().handle)
router.post('/users/edit/all', isAuthenticated, new EditUserController().handle)
// Faz a altenticação de login do usuario
router.post('/login', new AuthUserController().handle)
// Pega os detalhes do usuario logado
router.get('/me', isAuthenticated, new DetailUserController().handle)


// PRESENCE DAY //

// Pega todas as escalas do sistema
router.get('/presenceday', isAuthenticated, new ListePresenceDayController().handle)
// Cria um novo dia de trabalho
router.post('/presenceday', isAuthenticated, new CreatePresenceDayController().handle)
// Delta presnece day
router.delete('/presenceday', isAuthenticated, new DeletePresenceDayController().handle)


// ATTENDANCE //

// Cria um registro de ponto
router.post('/attendance', isAuthenticated, new CreateAttendanceController().handle)
// Calcular tempo
router.post('/attendance/time', isAuthenticated, new ContTimeController().handle)


export { router }