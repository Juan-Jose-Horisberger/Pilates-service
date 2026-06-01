const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "clave_dev_segura";

const register = async (req, res) => {
  try {
    const { name, surname, email, password, image } = req.body;

    console.log({ name, surname, email, password, image });

    if (!email || !password || !name || !surname) {
      return res.status(400).json({ message: "Required data is missing" });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(404)
        .json({ message: "The user is already registered" });
    }

    const hashed = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashed,
      name,
      surname,
      rol: "STUDENT",
      image: image ?? "",
    });

    return res.status(200).json(`Username ${name} has successfully registered`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error while trying to register user" });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { email, name, surname, image } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // ¿Existe usuario?
    let user = await User.findOne({ where: { email } });

    // Si no existe → registrarlo automáticamente
    if (!user) {
      user = await User.create({
        email,
        password: null, // No usamos password con Google
        name,
        surname,
        rol: "STUDENT",
        image: image ?? "",
      });
    }

    // Emitimos JWT propio
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Google login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error in Google auth" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required data is missing" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({ message: "Logged in", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error while trying to log in to the app",
    });
  }
};

// PERFIL DEL USUARIO AUTENTICADO
const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "rol", "image"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error while trying to retrieve a user profile",
    });
  }
};

module.exports = {
  register,
  googleAuth,
  login,
  profile,
};
