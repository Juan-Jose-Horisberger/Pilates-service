const { Router } = require("express");
const {
  getTurns,
  getTurnsByMonth,
  getTurnsByWeek,
  checkTurnsExist,
  generateTurnsForMonth,
  deleteTurnsForMonth,
} = require("../controllers/TurnController");
const router = Router();

//GET
router.get("/", getTurns);
router.get("/by-month", getTurnsByMonth);
router.get("/by-week", getTurnsByWeek);
router.get("/exists", checkTurnsExist);

// POST
router.post("/generate-month", generateTurnsForMonth);

// DELETE
router.delete("/delete-month", deleteTurnsForMonth);

module.exports = router;
