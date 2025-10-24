import { timeStamp } from "console"
import PoolManager from "../config/poolManager"
import { IUser } from '../interfaces/IUser'

export class UserModel {
    private pool = PoolManager.getInstance()

    public async getUsers(): Promise<IUser[]> {
        try {
            const [rows] = await (await this.pool).query('SELECT * FROM users')
            const users = rows as IUser[]
            return users.length ? users : []
        } catch (err) {
            console.error('Error fetching users', err)
            throw new Error('Error fetching users')
        }
    }

    public async getUserById(id: number): Promise<IUser | null> {
        try {
            const [rows] = await (await this.pool).execute('SELECT * from users WHERE id = ? LIMIT 1', [id])
            const user = rows as IUser[]
            return user.length ? user[0] : null
        } catch (err) {
            console.error(`Error fetching user with id ${id}`, err)
            throw new Error("Database error")
        }
    }
    public async getUserByEmail(email: string): Promise<IUser | null> {
        try {
            const [rows] = await (await this.pool).execute('SELECT * from users WHERE email = ? LIMIT 1', [email])
            const user = rows as IUser[]
            return user.length ? user[0] : null
        } catch (err) {
            console.error(`Error fetching user with id ${email}`, err)
            throw new Error("Database error")
        }
    }
    public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
        try {
            const [rows] = await (await this.pool).execute('SELECT * from users WHERE email = ? AND password = ? LIMIT 1', [email, password])
            const user = rows as IUser[]
            return user.length ? user[0] : null
        } catch (err) {
            console.error(`Error fetching user with email ${email} and password`, err)
            throw new Error("Database error")
        }
    }
    public async createUser(user: IUser): Promise<void> {
        try {
            await (await this.pool).execute('INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [user.name, user.email, user.password])
        } catch (err) {
            console.error("Error creating user:", err)
            throw new Error("Database error")
        }
    }

    public async updateUser(user: IUser): Promise<void> {
        try {
            await (await this.pool).execute('UPDATE users SET name = ?, email = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [user.name, user.email, user.password, user.id])
        } catch (err) {
            console.error(`Error updating user with id ${user.id}:`, err)
            throw new Error("Database error")
        }
    }

    public async deleteUser(id: number): Promise<void> {
        try {
            await (await this.pool).execute('DELETE FROM users WHERE id = ?', [id])
        } catch (err) {
            console.error(`Error deleting user with id ${id}:`, err)
            throw new Error("Database error")
        }
    }
}

export default UserModel