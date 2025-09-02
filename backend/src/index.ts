import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { errorHandler } from './middlewares/errorHandler'
import taskRouter from './controllers/taskController'

const app = new Hono()

app.use('*', cors())
app.onError(errorHandler)
app.route('/', taskRouter)

export default app
