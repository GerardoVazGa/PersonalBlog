import { Pool } from "pg"
import { dbConfig } from "../configs/db_config.js"

const pool = new Pool(dbConfig)

export default pool