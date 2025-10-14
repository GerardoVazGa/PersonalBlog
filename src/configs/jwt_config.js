import {SECRET_JWT_KEY, EXPIRES_JWT_IN} from "./env.js"
import jwt from "jsonwebtoken"

export const jwtConfig = {
    secret: SECRET_JWT_KEY,
    expiresIn: EXPIRES_JWT_IN
}

export const generateToken = (payload) => {
    return jwt.sign(payload, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn})
}
