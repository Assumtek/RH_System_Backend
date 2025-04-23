import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import { router } from './router/routes'

const app = express()
app.use(express.json())
app.use(cors())

app.use(fileUpload({
  limits:{
    fileSize: 50 * 1024 * 1024
  } // no maximo 50mb
}))

app.use(router)

export default app 