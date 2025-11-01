const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const users = require('./User');
const turns = require('./Turn');
const instructors = require('./Instructor');
const router = Router();

router.use('/api/turns', turns);
router.use('/api/users', users);
router.use('/api/instructors', instructors);

module.exports = router;

//---> Request ----> Server ----> Index.JS ---->
//                                                \
//                                                 \
//                                                /  \
//                                               /    \
//                                          /turns   /users
