import { PrismaClient } from "@prisma/client";
import { CreateTaskInput, UpdateTaskInput } from "../types";

const prisma = new PrismaClient();

export class TaskService {
    async getAllTasks() {
        return await prisma.task.findMany({
            orderBy: { createdAt: 'asc' }
        })
    }

    async getTaskById(id: string) {
        const task = await prisma.task.findUnique({ where: { id } })
        if (!task) throw new Error('Task not found');
        return task;
    }

    async createTask(data: CreateTaskInput) {
        return await prisma.task.create({ data })
    }

    async updateTask(id: string, data: UpdateTaskInput) {
        return await prisma.task.update({ where: { id }, data })
    }

    async deleteTask(id: string) {
        await this.getTaskById(id);
        await prisma.task.delete({ where: { id } })
    }
}

export const taskService = new TaskService();