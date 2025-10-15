import jwt from "jsonwebtoken"
import {jwtConfig} from "../configs/jwt_config.js"
export function loggedAdmin(req, res, next) {
    const token = req.cookies.access_token
    req.session = null

    if(!token) {
        res.locals.isAdmin = false
        return next()
    }

    try {
        const data = jwt.verify(token, jwtConfig.secret)
        res.locals.isAdmin = data.isAdmin === true
        req.session = data
    } catch (error) {}

    next()
}