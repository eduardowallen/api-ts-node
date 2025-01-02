import { timeStamp } from "console"
import PoolManager from "../config/poolManager"
import { IAdmin } from '../interfaces/IAdmin'

export class AdminModel {
    private pool = PoolManager.getInstance()

    public async getAdmins(): Promise<IAdmin[]> {
        try {
            const [rows] = await (await this.pool).query('SELECT * FROM Admins')
            const Admins = rows as IAdmin[]
            return Admins.length ? Admins : []
        } catch (err) {
            console.error('Error fetching Admins', err)
            throw new Error('Error fetching Admins')
        }
    }

    public async getAdminById(id: number): Promise<IAdmin | null> {
        try {
            const [rows] = await (await this.pool).execute('SELECT * from Admins WHERE id = ? LIMIT 1', [id])
            const Admin = rows as IAdmin[]
            return Admin.length ? Admin[0] : null
        } catch (err) {
            console.error(`Error fetching Admin with id ${id}`, err)
            throw new Error("Database error")
        }
    }
    public async getAdminByEmail(email: string): Promise<IAdmin | null> {
        try {
            const [rows] = await (await this.pool).execute('SELECT * from Admins WHERE email = ? LIMIT 1', [email])
            const Admin = rows as IAdmin[]
            return Admin.length ? Admin[0] : null
        } catch (err) {
            console.error(`Error fetching Admin with id ${email}`, err)
            throw new Error("Database error")
        }
    }    
    public async createAdmin(Admin: IAdmin): Promise<void> {
        try {
            await (await this.pool).execute('INSERT INTO Admins (name, email, password, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [Admin.name, Admin.email, Admin.password])
        } catch (err) {
            console.error("Error creating Admin:", err)
            throw new Error("Database error")
        }
    }

    public async updateAdmin(Admin: IAdmin): Promise<void> {
        try {
            await (await this.pool).execute('UPDATE Admins SET name = ?, email = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [Admin.name, Admin.email, Admin.password, Admin.id])
        } catch (err) {
            console.error(`Error updating Admin with id ${Admin.id}:`, err)
            throw new Error("Database error")
        }
    }

    public async deleteAdmin(id: number): Promise<void> {
        try {
            await (await this.pool).execute('DELETE FROM Admins WHERE id = ?', [id])
        } catch (err) {
            console.error(`Error deleting Admin with id ${id}:`, err)
            throw new Error("Database error")
        }
    }
}

export default AdminModel