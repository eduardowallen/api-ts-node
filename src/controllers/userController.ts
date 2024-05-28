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
    
    export const getUserByIdController = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        const user: User | undefined = getUserById(id)
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    }
    
    export const createUserController = (req: Request, res: Response): void => {
        const user: User = req.body
        createUser(user)
        res.status(201).json({
            message: 'User created successfully',
            user
        })
    }
    
    export const updateUserController = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        const user: User = req.body
        user.id = id
        updateUser(user)
        res.status(200).json({
            message: 'User updated successfully',
            user
        })
    }
    
    export const deleteUserController = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        deleteUser(id)
        res.status(200).json({
            message: `User ${id} deleted`
        })
    }

}

export default UserController