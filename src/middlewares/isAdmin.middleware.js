
export function isAdmin(req, res, next) {
    if(req.session?.isAdmin !== true) {
        return res.status(403).json({success: false, message: "Admin access denied"})
    }

    return next()
}