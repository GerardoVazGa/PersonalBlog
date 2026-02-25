import {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_MAX, DB_IDLE_TIMEOUT, DB_CONNECTION_TIMEOUT} from "./env.js"

export const dbConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    max: DB_MAX,
    idleTimeoutMillis: DB_IDLE_TIMEOUT,
    connectionTimeoutMillis: DB_CONNECTION_TIMEOUT
}