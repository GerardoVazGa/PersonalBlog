import {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} from "./env.js"

export const dbConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
}