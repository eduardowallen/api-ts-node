import PoolManager from "../config/poolManager"
import { User } from '../interfaces/IUser'

export class UserModel {
    private pool = PoolManager.getInstance()

    public async getUsers(): Promise<Array<User>> {
        try {
            const [rows] = await this.pool.execute('SELECT * FROM users')
            const users = rows as User[]
            return users.length ? users : []
        } catch (err) {
            console.error(err)
            return []
        }
    }

    public async getUser(id: number): Promise<User | null> {
        try {
            const [rows] = await this.pool.execute('SELECT * from users WHERE id = ? LIMIT 1', id)
            const user = rows as User[]
            return user.length ? user[0] : null
        } catch (err) {
            console.error(err)
            return null
        }
    }
    
    public async createUser(user: User): Promise<void> {
        try {
            await this.pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password])
        } catch (err) {
            console.error(err)
        }
    }
}

export default UserModel

/*
const users: Array<User> = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@test.com',
        password: '123456'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@test.com',
        password: 'secret'
    },
    {
        id: 3,
        name: 'Jack Doe',
        email: 'jack.doe@test.com',
        password: 'password'
    },
]

export const getUsers = (): Array<User> => {
    return users
}

export const getUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id)
}

export const createUser = (user: User): void => {
    users.push(user)
}

export const updateUser = (user: User): void => {
    const index = users.findIndex(u => u.id === user.id)
    users[index] = user
}

export const deleteUser = (id: number): void => {
    const index = users.findIndex(u => u.id === id)
    users.splice(index, 1)
}
*/