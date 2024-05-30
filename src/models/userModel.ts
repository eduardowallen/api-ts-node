import PoolManager from "../config/poolManager"
import { User } from '../interfaces/IUser'

export class UserModel {
    private pool = PoolManager.getInstance()

    public async getUsers(): Promise<Array<User>> {
        try {
            const [rows] = await (await this.pool).query('SELECT * FROM users')
            const users = rows as User[]
            return users.length ? users : []
        } catch (err) {
            console.error('Error fetching users', err)
            throw new Error('Error fetching users')
        }
    }

    public async getUserById(id: number): Promise<User | null> {
        try {
            const [rows] = await (await this.pool).execute('SELECT * from users WHERE id = ? LIMIT 1', id)
            const user = rows as User[]
            return user.length ? user[0] : null
        } catch (err) {
            console.error(`Error fetching user with id ${id}`, err)
            throw new Error("Database error")
        }
    }
    
    public async createUser(user: User): Promise<void> {
        try {
            await (await this.pool).execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password])
        } catch (err) {
            console.error("Error creating user:", err)
            throw new Error("Database error")
        }
    }

    public async updateUser(user: User): Promise<void> {
        try {
            await (await this.pool).execute('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [user.name, user.email, user.password, user.id])
        } catch (err) {
            console.error(`Error updating user with id ${user.id}:`, err)
            throw new Error("Database error")
        }
    }

    public async deleteUser(id: number): Promise<void> {
        try {
            await (await this.pool).execute('DELETE FROM users WHERE id = ?', id)
        } catch (err) {
            console.error(`Error deleting user with id ${id}:`, err)
            throw new Error("Database error")
        }
    }
}

export default UserModel