import {SESSION_SECRET} from "./env.js"
import MySQLStore from "express-mysql-session"
import pool from "../db/db.js"

const sessionStore = new MySQLStore({}, pool)

export const sessionConfig = {
    secret: SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}