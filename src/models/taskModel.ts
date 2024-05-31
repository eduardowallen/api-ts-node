import PoolManager from "../config/poolManager"
import { ITask } from "../interfaces/ITask"
export class TaskModel {
    private pool = PoolManager.getInstance()
    
    public async getTasks(): Promise<ITask[]> {
        try {
            const [rows] = await (await this.pool).query('SELECT * FROM tasks')
            const tasks = rows as ITask[]
            return tasks.length ? tasks : []
        } catch (err) {
            console.error('Error fetching tasks', err)
            throw new Error('Error fetching tasks')
        }
    }
    public async getTaskById(id: number): Promise<ITask | null> {
        try {
            const [rows] = await (await this.pool).query("Select * FROM tasks LIMIT 1")
            const tasks = rows as ITask[]
            return tasks.length ? tasks[0] : null
        } catch (err) {
            console.error(`Error fetching task ${id}`, err)
            throw new Error("Database error")
        }
    }
}