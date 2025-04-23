import { Request, Response, Router } from 'express'

// Rotas
import { authRouter } from './auth.routes'
import { attendanceRouter } from './attendance.routes'
import { userRouter } from './user.routes'
import { presenceDayRouter } from './presenceday.routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/attendance', attendanceRouter)
router.use('/users', userRouter)
router.use('/presenceday', presenceDayRouter)

router.get('/', (req: Request, res: Response) => {
  return res.send(`
    <h1 style='font-family: sans-serif'>
        API HRsysten!!!
    <h1>
  `)
})

export { router }