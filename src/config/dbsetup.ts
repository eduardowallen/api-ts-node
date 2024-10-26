import mysql from 'mysql2/promise'
import { CREATE_DATABASE, SELECT_DATABASE, 
    CREATE_GLOBALADMINS_TABLE, CREATE_ORGANIZERS_TABLE, CREATE_ADMINS_TABLE, CREATE_EXHIBITORS_TABLE, CREATE_SPEAKERS_TABLE, CREATE_VISITORS_TABLE, 
    CREATE_EVENTS_TABLE, CREATE_MAPS_TABLE, CREATE_BOOKINGS_TABLE, 
    CREATE_INVOICES_TABLE, CREATE_SMS_TABLE, 
    CREATE_TRANSLATIONS_TABLE } from './dbqueries'
export default async function setupDatabase(connection: mysql.Connection): Promise<void> {
    await connection.query(CREATE_DATABASE)
    await connection.query(SELECT_DATABASE)
    await connection.query(CREATE_GLOBALADMINS_TABLE)
    await connection.query(CREATE_ORGANIZERS_TABLE)
    await connection.query(CREATE_ADMINS_TABLE)
    await connection.query(CREATE_EXHIBITORS_TABLE)
    await connection.query(CREATE_SPEAKERS_TABLE)
    await connection.query(CREATE_VISITORS_TABLE)
    await connection.query(CREATE_EVENTS_TABLE)
    await connection.query(CREATE_MAPS_TABLE)
    await connection.query(CREATE_BOOKINGS_TABLE)
    await connection.query(CREATE_INVOICES_TABLE)
    await connection.query(CREATE_SMS_TABLE)
    await connection.query(CREATE_TRANSLATIONS_TABLE)
    return Promise.resolve()
}