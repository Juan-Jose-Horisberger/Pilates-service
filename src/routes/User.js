const { Router } = require('express')
// const { authMiddleware } = require('../controllers/utils/authMiddleware')
const { getUsers, createUser, updateUserRole, deleteUser } = require('../controllers/UserController')
const router = Router()

//GET
router.get('/', getUsers);

// POST
// router.post('/register', register); //Este desarrollo se trabajara mas adelante
router.post('/create-user', createUser); 

// PATCH
router.patch('/:id/update-rol', updateUserRole);

// DELETE
router.delete('/delete-user', deleteUser);

module.exports = router;