import { Hono } from "hono";
import { taskService } from "../services/taskService";
import { CreateTaskInput, UpdateTaskInput } from "../types";


const taskRouter = new Hono()

taskRouter.get('/tasks', async (c) => {
    try {
        const tasks = await taskService.getAllTasks()
        return c.json(tasks)
    } catch (error) {
        return c.json({ error: (error as Error).message }, 500)
    }
})

taskRouter.get('/tasks/:id', async (c) => {
    try {
        const task = await taskService.getTaskById(c.req.param('id'))
        return c.json(task)
    } catch (error) {
        return c.json({ error: (error as Error).message }, 404)
    }
})

taskRouter.post('/tasks', async (c) => {
    try {
        const data = await c.req.json<CreateTaskInput>()
        const task = await taskService.createTask(data)
        return c.json(task, 201)
    } catch (error) {
        return c.json({ error: (error as Error).message }, 400)
    }
})

taskRouter.put('/tasks/:id', async (c) => {
    try {
        const data = await c.req.json<UpdateTaskInput>()
        const task = await taskService.updateTask(c.req.param('id'), data)
        return c.json(task, 200)
    } catch (error) {
        return c.json({ error: (error as Error).message }, 400)
    }
})

taskRouter.delete('/tasks/:id', async (c) => {
    try {
        await taskService.deleteTask(c.req.param('id'))
        return c.text('Task deleted!', 200)
    } catch (error) {
        return c.json({ error: (error as Error).message }, 404)
    }
})

export default taskRouter;