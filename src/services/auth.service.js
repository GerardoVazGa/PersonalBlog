import {ADMIN_PASS}  from "../configs/env.js"

export const loginAuthAdmin = async (password) => {
    
    return await password === ADMIN_PASS
}