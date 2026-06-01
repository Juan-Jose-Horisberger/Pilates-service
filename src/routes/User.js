const { Router } = require("express");
// const { authMiddleware } = require('../controllers/utils/authMiddleware')
const {
  getUsers,
  createUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/UserController");
const router = Router();

//GET
router.get("/", getUsers);

// POST
// (Este endpoint solo lo puede utilizar el usuario admin, para crear un usuario y gestionarle clases a ese usuario recien creado por si la persona mayor no sabe usar la App.)
router.post("/create-user", createUser);

// PATCH
router.patch("/:id/update-rol", updateUserRole);

// DELETE
router.delete("/delete-user", deleteUser);

module.exports = router;
