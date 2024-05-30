import mysql from 'mysql2/promise'
import { CREATE_DATABASE, SELECT_DATABASE, CREATE_USERS_TABLE, CREATE_TASKS_TABLE} from './dbqueries'
export default async function setupDatabase(connection: mysql.Connection): Promise<void> {
    await connection.query(CREATE_DATABASE)
    await connection.query(SELECT_DATABASE)
    await connection.query(CREATE_USERS_TABLE)
    await connection.query(CREATE_TASKS_TABLE)
    return Promise.resolve()
}