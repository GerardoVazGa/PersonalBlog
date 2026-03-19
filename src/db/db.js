import { Pool } from "pg"
import { dbConfig } from "../configs/db_config.js"
import { DATABASE_URL } from "../configs/env.js"

const connection = DATABASE_URL 
    ? { 
        connectionString: DATABASE_URL, 
        ssl: { rejectUnauthorized: false } 
    } 
    : dbConfig

const pool = new Pool(connection)

export default pool