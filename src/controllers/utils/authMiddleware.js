const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET || 'clave_dev_segura'

const authMiddleware = (req, res, next) => {
    console.log("req.user.rol: ", req.user.rol)
    if (req.user && req.user.rol === 'ADMIN') {
        return next();
    }
    res.status(403).send('Access denied. Admins only.');
}

const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(400).json({ message: 'Token no proporcionado' })

    const token = header.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Formato de token inválido' })

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' })
    }
}

module.exports = {
    authMiddleware,
    verifyToken
}