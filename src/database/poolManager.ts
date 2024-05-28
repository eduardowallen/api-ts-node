import mysql from 'mysql2/promise'

class PoolManager {
    private static instance: mysql.Pool

    private constructor() {}

    public static getInstance(): mysql.Pool {
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
}

export default PoolManager