const { Router } = require('express')
const { getTurns, getTurnsByMonth, getTurnsByWeek, generateTurnsForMonth } = require('../controllers/TurnController')
const router = Router()

//GET
router.get('/', getTurns);
router.get('/by-month', getTurnsByMonth);
router.get('/by-week', getTurnsByWeek);

// POST
router.post('/generate-month', generateTurnsForMonth)

module.exports = router;