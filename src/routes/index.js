const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const users = require('./User');
const turns = require('./Turn');
const instructors = require('./Instructor');
const auth = require('./Auth')
const router = Router();

router.use('/api/turns', turns);
router.use('/api/users', users);
router.use('/api/instructors', instructors);
router.use('/api/auth', auth);

module.exports = router;

//---> Request ----> Server ----> Index.JS ---->
//                                                \
//                                                 \ -------
//                                                /  \      \
//                                               /    \       \
//                                          /turns   /users    /instructors
