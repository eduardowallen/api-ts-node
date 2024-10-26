import dotenv from 'dotenv'
dotenv.config()

export const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`
export const SELECT_DATABASE = `USE ${process.env.MYSQL_DATABASE}`

const default_user_interface = `(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`

/* Users tables */
export const CREATE_GLOBALADMINS_TABLE = `CREATE TABLE IF NOT EXISTS globaladmins` + {default_user_interface}
export const CREATE_VISITORS_TABLE = `CREATE TABLE IF NOT EXISTS visitors` + {default_user_interface}
export const CREATE_ORGANIZERS_TABLE = `CREATE TABLE IF NOT EXISTS organizers` + {default_user_interface}
export const CREATE_ADMINS_TABLE = `CREATE TABLE IF NOT EXISTS admins` + {default_user_interface} + `)`
export const CREATE_EXHIBITORS_TABLE = `CREATE TABLE IF NOT EXISTS exhibitors` + {default_user_interface}
export const CREATE_SPEAKERS_TABLE = `CREATE TABLE IF NOT EXISTS speakers` + {default_user_interface}

/* Events, maps, spaces and bookings table */
export const CREATE_EVENTS_TABLE = `CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    owner_id INT NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
export const CREATE_MAPS_TABLE = `CREATE TABLE IF NOT EXISTS maps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    owner_id INT NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
export const CREATE_BOOKINGS_TABLE = `CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    exhibitor_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

/* Services tables */
export const CREATE_INVOICES_TABLE = `CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
export const CREATE_SMS_TABLE = `CREATE TABLE IF NOT EXISTS sms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
export const CREATE_TRANSLATIONS_TABLE = `CREATE TABLE IF NOT EXISTS translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    system_string VARCHAR(255) NOT NULL,
    english VARCHAR(255) NOT NULL,
    swedish VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`