const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const InstructorProfile = sequelize.define(
    'instructorProfile',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

      // Ejemplo de esquema de clases del instructor
      schedule: {
        // Array de objetos [{ day: 'Lunes', start: '10:00', end: '12:00' }]
        type: DataTypes.JSONB,
        allowNull: true,
      },

      // Modalidad de pago
      paymentType: {
        type: DataTypes.ENUM('PERCENTAGE', 'FIXED'),
        allowNull: true,
      },

      paymentValue: {
        // Si es PERCENTAGE => porcentaje (ej: 50)
        // Si es FIXED => monto (ej: 2000 x persona)
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  return InstructorProfile;
};
