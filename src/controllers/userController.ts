import { Request, Response } from 'express'
import { User } from '../interfaces/IUser'
import { UserModel } from '../models/userModel'

class UserController {
    private userModel: UserModel

    constructor () {
        this.userModel = new UserModel()
    }
    
    public getUsers = async (req: Request, res: Response): Promise<void> => {
        const users = await this.userModel.getUsers()
        res.status(200).json({ users })
    }
    
    public getUserById = async (req: Request, res: Response): Promise<void> => {
        const id: number = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.status(404).json({ message: 'Invalid user ID' })
        }
        try {
            const user: User | null = await this.userModel.getUserById(id)
            if (user) {
                res.status(200).json({ user })
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    
    public createUser = async (req: Request, res: Response): Promise<void> => {
        const user: User = req.body
        if (!user.name || !user.email || !user.password) {
            res.status(400).json({ message: 'Missing required fields' })
            return
        }
        try {
            await this.userModel.createUser(user)
            res.status(201).json({
                message: 'User created successfully',
                user
            })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    
    public updateUser = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        const user: User = req.body
        user.id = id
        this.userModel.updateUser(user)
        res.status(200).json({
            message: 'User updated successfully',
            user
        })
    }
    
    public deleteUser = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        this.userModel.deleteUser(id)
        res.status(200).json({
            message: `User ${id} deleted`
        })
    }

}

export default UserController