import { Request, Response } from 'express'
import { IUser } from '../interfaces/IUser'
import { UserModel } from '../models/userModel'
import { isValidEmail } from '../utils/users.validators'
import { getDummyUser } from '../config/dummyData'
class UserController {
    private userModel: UserModel

    constructor () {
        try {
            this.userModel = new UserModel()
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error(`Failed to initialize UserModel: ${error}`)
            }
        }
    }
    
    public getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users: IUser[] | null = await this.userModel.getUsers()
            if (users === null || users.length === 0) {
                res.status(404).json({ message: 'No users found 😱' })
            } else {
                res.status(200).json({ users })
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }
    
    public getUserById = async (req: Request, res: Response): Promise<void> => {
        const id: number = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.status(404).json({ message: 'Invalid user ID' })
        }
        try {
            const user: IUser | null = await this.userModel.getUserById(id)
            if (user) {
                res.status(200).json({ user })
            } else {
                res.status(404).json({ message: `User with id: ${id} was not found` })
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }
    public getUserByEmail = async (req: Request, res: Response): Promise<void> => {
        const email: string = req.params.email
        if (!isValidEmail(email)) {
            res.status(404).json({ message: 'Invalid user email' })
        }
        try {
            const user: IUser | null = await this.userModel.getUserByEmail(email)
            if (user) {
                res.status(200).json({ user })
            } else {
                res.status(404).json({ message: `User with id: ${email} was not found` })
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }    
    public createUser = async (req: Request, res: Response): Promise<void> => {
        const user: IUser = { ...req.body, id: undefined }
        if (!user.name || !user.email || !user.password) {
            res.status(400).json({ message: 'Missing required fields' })
            return
        }
        try {
            const createdUser = await this.userModel.createUser(user)
            res.status(201).json({
                message: 'User created successfully',
                user: createdUser
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }
    public createDummyUser = async (req: Request, res: Response): Promise<void> => {
        const user: IUser = { ...getDummyUser(), id: undefined }
        if (!user.name || !user.email || !user.password) {
            res.status(400).json({ message: 'Missing required fields' })
            return
        }
        try {
            const createdUser = await this.userModel.createUser(user)
            res.status(201).json({
                message: 'User created successfully',
                user: createdUser
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    } 
    public updateUser = async (req: Request, res: Response): Promise<void> => {
        if (req.params?.id === undefined) {
            res.status(400).json({ message: 'Missing user ID' })
            return
        }
        const id: number = parseInt(req.params.id, 10)
        const user: IUser = req.body
        user.id = id
        try {
            await this.userModel.updateUser(user)
            res.status(200).json({
                message: 'User updated successfully',
                user: user
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }
    
    public deleteUser = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        try {
            this.userModel.deleteUser(id)
            res.status(200).json({ message: `User with id: ${id} deleted` })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }

    }
}

export default UserController