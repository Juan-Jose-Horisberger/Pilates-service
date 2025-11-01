const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'StudentProfile',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                  model: 'users',
                  key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            age: {
                type: DataTypes.INTEGER,
                defaultValue: DataTypes.NOW,
                allowNull: false,
                validate: {
                    min: 0,
                    max: 120, // límite lógico
                },
            },

            surname: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            height: {
                type: DataTypes.DECIMAL(4, 2),
                allowNull: false,
                validate: {
                    min: 0.5,
                    max: 2.5, // límites razonables
                },
            },

            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            phone: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            pathology: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },

            exercisesRegularly: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            
            exerciseHistory: {
                type: DataTypes.STRING(250),
                allowNull: false,
                validate: {
                  len: [0, 250]
                }
            }
        },
        { timestamps: true }
    );
};
