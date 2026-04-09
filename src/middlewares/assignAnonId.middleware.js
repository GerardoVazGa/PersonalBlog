import {v4 as uuidv4} from 'uuid'

const assignAnonId = (req, res, next) => {
    let anonId = req.cookies?.anonId

    if(!anonId){
        anonId = uuidv4()
        res.cookie('anonId', anonId, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 365 * 24 * 60 * 60 * 1000
        })
    }

    req.anonId = anonId

    next()
}

export default assignAnonId