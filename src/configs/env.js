import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT || 3000

export const DB_HOST = process.env.DB_HOST || "localhost"
export const DB_USER = process.env.DB_USER || "postgres"
export const DB_PASSWORD = process.env.DB_PASSWORD || ""
export const DB_NAME = process.env.DB_NAME || ""
export const DB_PORT = process.env.DB_PORT || 5432
export const DB_MAX = parseInt(process.env.DB_MAX) || 20
export const DB_IDLE_TIMEOUT = parseInt(process.env.DB_IDLE_TIMEOUT) || 30000
export const DB_CONNECTION_TIMEOUT = parseInt(process.env.DB_CONNECTION_TIMEOUT) || 2000

export const ADMIN_PASS = process.env.ADMIN_PASS
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || "DEFAULT_SECRET"
export const EXPIRES_JWT_IN = process.env.EXPIRES_JWT_IN || "1h"
