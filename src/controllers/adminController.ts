import { Request, Response } from 'express'
import { IAdmin } from '../interfaces/IAdmin'
import { AdminModel } from '../models/adminModel'
import { isValidEmail } from '../utils/users.validators'
import { getDummyAdmin } from '../config/dummyData'
class AdminController {
    private AdminModel: AdminModel

    constructor () {
        try {
            this.AdminModel = new AdminModel()
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error(`Failed to initialize AdminModel: ${error}`)
            }
        }
    }
    
    public getAdmins = async (req: Request, res: Response): Promise<void> => {
        try {
            const Admins: IAdmin[] | null = await this.AdminModel.getAdmins()
            if (Admins === null || Admins.length === 0) {
                res.status(404).json({ message: 'No Admins found 😱' })
            } else {
                res.status(200).json({ Admins })
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }
    
    public getAdminById = async (req: Request, res: Response): Promise<void> => {
        const id: number = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            res.status(404).json({ message: 'Invalid Admin ID' })
        }
        try {
            const Admin: IAdmin | null = await this.AdminModel.getAdminById(id)
            if (Admin) {
                res.status(200).json({ Admin })
            } else {
                res.status(404).json({ message: `Admin with id: ${id} was not found` })
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }
    public getAdminByEmail = async (req: Request, res: Response): Promise<void> => {
        const email: string = req.params.email
        if (!isValidEmail(email)) {
            res.status(404).json({ message: 'Invalid Admin email' })
        }
        try {
            const Admin: IAdmin | null = await this.AdminModel.getAdminByEmail(email)
            if (Admin) {
                res.status(200).json({ Admin })
            } else {
                res.status(404).json({ message: `Admin with id: ${email} was not found` })
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }    
    public createAdmin = async (req: Request, res: Response): Promise<void> => {
        const Admin: IAdmin = { ...req.body, id: undefined }
        if (!Admin.name || !Admin.email || !Admin.password) {
            res.status(400).json({ message: 'Missing required fields' })
            return
        }
        try {
            const createdAdmin = await this.AdminModel.createAdmin(Admin)
            res.status(201).json({
                message: 'Admin created successfully',
                Admin: createdAdmin
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }
    public createDummyAdmin = async (req: Request, res: Response): Promise<void> => {
        const Admin: IAdmin = { ...getDummyAdmin(), id: undefined }
        if (!Admin.name || !Admin.email || !Admin.password) {
            res.status(400).json({ message: 'Missing required fields' })
            return
        }
        try {
            const createdAdmin = await this.AdminModel.createAdmin(Admin)
            res.status(201).json({
                message: 'Admin created successfully',
                Admin: createdAdmin
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    } 
    public updateAdmin = async (req: Request, res: Response): Promise<void> => {
        if (req.params?.id === undefined) {
            res.status(400).json({ message: 'Missing Admin ID' })
            return
        }
        const id: number = parseInt(req.params.id, 10)
        const Admin: IAdmin = req.body
        Admin.id = id
        try {
            await this.AdminModel.updateAdmin(Admin)
            res.status(200).json({
                message: 'Admin updated successfully',
                Admin: Admin
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }
    }
    
    public deleteAdmin = (req: Request, res: Response): void => {
        const id: number = parseInt(req.params.id, 10)
        try {
            this.AdminModel.deleteAdmin(id)
            res.status(200).json({ message: `Admin with id: ${id} deleted` })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error 💣' })
            }
        }

    }
}

export default AdminController