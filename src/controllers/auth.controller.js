import * as authService from "../services/auth.service.js"
import jwt from "jsonwebtoken"

export const loginAdmin = async (req, res) => {
    try {
        const { password } = req.body
        const verified = await authService.loginAuthAdmin(password)

        if (verified) {
            req.session.admin = true
            return res.json({ success: true, message: "Admin access granted" })
        }

        return res.json({ success: false, message: "Invalid password" })
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