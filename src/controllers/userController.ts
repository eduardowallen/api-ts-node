import { Request, Response } from 'express'
import { User } from '../interfaces/IUser'
import { UserModel } from '../models/userModel'

class UserController {
    private userModel: UserModel

    constructor () {
        this.userModel = new UserModel()
    }
    
    public getUsers = (req: Request, res: Response): void => {
        const users = this.userModel.getUsers()
        res.status(200).json({ users })
    }
    
    public getUserByIdController = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        const user: User | undefined = this.userModel.getUserById(id)
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    }
    
    public createUserController = (req: Request, res: Response): void => {
        const user: User = req.body
        this.userModel.createUser(user)
        res.status(201).json({
            message: 'User created successfully',
            user
        })
    }
    
    public updateUserController = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        const user: User = req.body
        user.id = id
        this.userModel.updateUser(user)
        res.status(200).json({
            message: 'User updated successfully',
            user
        })
    }
    
    public deleteUserController = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        this.userModel.deleteUser(id)
        res.status(200).json({
            message: `User ${id} deleted`
        })
    }

}

export default UserController