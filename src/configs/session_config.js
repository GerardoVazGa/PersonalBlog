import {SESSION_SECRET} from "./env.js"

export const sessionConfig = {
    secret: SESSION_SECRET, 
    resave: false,
    saveUninitialized: true
}