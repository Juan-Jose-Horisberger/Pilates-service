const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'user',
        {
            // Al crear el usuario, por defecto se crean estos datos:
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            rol: {
                type: DataTypes.ENUM('STUDENT', 'ADMIN', 'INSTRUCTOR'),
                defaultValue: 'STUDENT'
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
                validate: {
                    isEmail: true,
                },
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        { timestamps: true }
    );
};
