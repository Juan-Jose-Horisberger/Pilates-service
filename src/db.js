require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

let sequelize =
    process.env.NODE_ENV === "production"
        ? new Sequelize({
            database: DB_NAME,
            dialect: "postgres",
            host: DB_HOST,
            port: Number(DB_PORT),
            username: DB_USER,
            password: DB_PASSWORD,
            pool: {
                max: 3,
                min: 1,
                idle: 10000,
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
                keepAlive: true,
            },
            ssl: true,
        })
        : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
            { logging: false, native: false, }
        );

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });


const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
const { User, Turn, InstructorProfile, StudentProfile } = sequelize.models;


// ~~~~~~~~~~~~~~~~ RELACIONES ~~~~~~~~~~~~~~~~

// Un usuario (INSTRUCTOR) tiene un perfil de instructor, relación 1:1
User.hasOne(InstructorProfile, {
    foreignKey: 'userId',
    as: 'instructorProfile',
});
InstructorProfile.belongsTo(User, { foreignKey: 'userId', as: 'instructor' });

// Un usuario (STUDENT) tiene un perfil de alumno, relación 1:1
User.hasOne(StudentProfile, {
    foreignKey: 'userId',
    as: 'studentProfile',
});
StudentProfile.belongsTo(User, { foreignKey: 'userId', as: 'student' });

// Un instructor (User) tiene muchos turnos, relación 1:N
User.hasMany(Turn, { foreignKey: 'instructorId', as: 'instructorTurns' });
Turn.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

// Muchos alumnos (User) pueden reservar muchos turnos, relación N:M
User.belongsToMany(Turn, {
    through: 'UserTurn',
    as: 'bookedTurns',
    foreignKey: 'studentId',
});

Turn.belongsToMany(User, {
    through: 'UserTurn',
    as: 'students',
    foreignKey: 'turnId',
});


module.exports = {
    Turn,
    User,
    InstructorProfile,
    StudentProfile,
    conn: sequelize
};