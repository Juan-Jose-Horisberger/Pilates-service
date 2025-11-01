const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'turn',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            
            // Día del turno: lunes, martes, etc.
            dayOfWeek: {
                type: DataTypes.ENUM(
                    'monday',
                    'tuesday',
                    'wednesday',
                    'thursday',
                    'friday',
                    'saturday'
                ),
                allowNull: false,
            },

            // Hora del turno (ej: 08:00, 09:00, etc.)
            hour: {
                type: DataTypes.TIME,
                allowNull: false,
            },

            // Semana a la que pertenece (1, 2, 3 o 4 del mes)
            weekNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 4,
                },
            },

            // Mes (ej: 'noviembre', 'octubre')
            month: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            // Año (ej: 2025)
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            // Estado del espacio (disponible, lleno, bloqueado, vacío)
            status: {
                type: DataTypes.ENUM('available', 'full', 'blocked', 'empty'),
                defaultValue: 'blocked',
            },

            // Capacidad máxima (por ejemplo, 5 personas)
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 5,
            },

            // Cantidad actual de alumnos anotados
            currentStudents: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },

            // Controlado por admin: si está visible o no para los alumnos
            isVisibleToStudents: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            instructorId: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
        },
        { timestamps: true }
    );
};
