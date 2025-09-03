export function loggedAdmin(req, res, next) {
    res.locals.isAdmin = !!req.session.admin
    next()
}