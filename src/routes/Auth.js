const { Router } = require('express')
const { register, login, profile } = require('../controllers/AuthController')
const { verifyToken } = require('../controllers/utils/authMiddleware')

const router = Router()

// Registro e inicio de sesión
router.post('/register', register)
router.post('/login', login)

// Rutas protegidas
router.get('/profile', verifyToken, profile)

module.exports = router
