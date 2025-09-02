import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TaskService {
    async getAllTasks() {
        return await prisma.task.findMany({
            orderBy: { createdAt: 'desc'}
        })
    }
}