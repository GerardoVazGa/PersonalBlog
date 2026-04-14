export const getHealth = (req, res) => {
    return res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timeStamp: new Date().toISOString()
    })
}