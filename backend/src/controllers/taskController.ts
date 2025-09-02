import { Hono } from "hono";
import { TaskService } from "../services/taskService";


const taskRouter = new Hono()

taskRouter.get('/tasks', async (c) => {
    try {
        const tasks = await TaskService.prototype.getAllTasks()
        return c.json(tasks)
    } catch (error) {
        return c.json({ error: 'Failed to fetch tasks' }, 500)
    }
})

export default taskRouter;