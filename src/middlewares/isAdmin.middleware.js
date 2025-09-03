export function isAdmin(req, res, next) {
    if(req.session.admin){
        return next()
    }

    return res.status(403).json({error: "Unauthorized access"})
}