import {SESSION_SECRET} from "./env.js"

export const sessionConfig = {
    secret: SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}