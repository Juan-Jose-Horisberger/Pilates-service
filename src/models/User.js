const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            rol: {
                type: DataTypes.ENUM('STUDENT', 'ADMIN', 'INSTRUCTOR'),
                defaultValue: 'STUDENT'
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        { timestamps: true }
    );
};
