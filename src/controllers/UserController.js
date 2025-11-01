const { User } = require("../db")

// GET
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();

    res.send(allUsers)
  }
  catch (error) {
    console.error('Error interno al intentar obtener los usuarios disponibles:', error)
    res.status(500).json({ message: 'Error interno al intentar obtener los usuarios' })
  }
}

// POST
const createUser = async (req, res) => {
  try{
    const {rol, email, image} = req.body;

    const newUser = await User.create({
      rol: rol,
      email: email,
      image: image ?? ''
    })

    newUser && res.status(201).json({message: `¡Usuario rol ${rol} creado con éxito!`});
    return;
  }
  catch(error){
    console.log("Ocurrió un error al intentar crear un usuario: ", error);
    res.status(500).json({message: "Error al intentar crear un usuario"})
  }
}

// PATCH
const updateUserRole = async (req, res) => {
  try{
    const {id} = req.params;
    const {rol} = req.body;

    if(!id || !rol){
      res.status(400).json({message: "Required data is missing"});
    }
    if(rol !== 'STUDENT' && rol !== 'INSTRUCTOR'){
      res.status(400).json({message: `Error: The information sent is incorrect ${rol}.`});
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.rol = rol;
    await user.save();
  }
  catch(error){
    console.error(`Error al intentar cambiar de rol al usuario con ID: ${id}`)
    res.status(500).json({message: "Error al intentar cambiar del rol al usuario"})
  }
}

// DELETE
const deleteUser = async (req, res) => {
  try{
    const {id, email} = req.body;

    if(!id || !email){
      return res.status(400).json({ message: 'Error no se enviaron todos los datos requeridos' })
    }

    const userDeleted = await User.destroy({
      where: {
        id: id
      }
    })

    userDeleted && res.status(201).json({message: `¡Usuario con ID ${id} y mail ${email} eliminado con éxito!`});
  }
  catch(error){
    res.status(500).json({message: `Error al intentar eliminar el usuario ${email}`})
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUserRole,
  deleteUser
}