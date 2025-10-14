import * as authService from "../services/auth.service.js"
import {generateToken} from "../configs/jwt_config.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"

export const loginAdmin = async (req, res) => {
    try {
        const { password } = req.body
        const verified = await authService.loginAuthAdmin(password)

        if (!verified) {
            return res.status(403).json({ success: false, message: "Admin access denied" })
        }

        const token = generateToken({isAdmin: true})

        return res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true, // La cookie no es accesible desde Javascript cliente
                secure: process.env.NODE_ENV === "production", // Solo se maneja en HTTPS
                sameSite: "strict", // La cookie solo se accesible desde el mismo sitio
                maxAge: 1000 * 60 * 60 // 1 hora
            })
            .json({success: true, message: "Admin access granted"})
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" })
    }
}

export const logoutAdmin = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).json({success: false, message: "Error al cerrar sesion"})
        }

        return res.json({success: true, message: "Se cerro la sesion correctamente"})
    })
}