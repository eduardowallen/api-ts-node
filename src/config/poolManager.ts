import mysql from 'mysql2/promise'
import setupDatabase from './dbsetup'

class PoolManager {
    private static instance: mysql.Pool

    private constructor() {}

    public static async getInstance(): Promise<mysql.Pool> {
        if (!PoolManager.instance) {
            PoolManager.instance = mysql.createPool({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            })
        }
        return PoolManager.instance
    }
    public static async checkDatabaseExists(): Promise<void> {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        })

        const [rows] = await connection.query(`SHOW DATABASES LIKE '${process.env.MYSQL_DATABASE}'`)
        if ((rows as any).length === 0) {
            await setupDatabase(connection)
            console.log(`Database missing. Setting up database '${process.env.MYSQL_DATABASE}'`)
        } else {
            console.log('Database exists, skipping setup')
        }
        await connection.end()
    }
}

export default PoolManager