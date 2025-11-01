const { Router } = require('express')
const { getInstructorProfile, configureInstructor } = require('../controllers/InstructorController')
const router = Router()

// GET
router.get('/:userId', getInstructorProfile);

// POST
router.post('/configure', configureInstructor);

// PATCH

// DELETE

module.exports = router;