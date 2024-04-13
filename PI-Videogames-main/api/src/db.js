require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DATABASE,POSTGRES_URL
} = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ?  new Sequelize(
        `${POSTGRES_URL}`,
        { logging: false, native: false }) 
      : new Sequelize({
          database: POSTGRES_DATABASE,
          username: POSTGRES_USER,
          password: POSTGRES_PASSWORD,
          host: POSTGRES_HOST,
          port: POSTGRES_PORT,
          dialect: "postgres",
            pool: {
              max: 3,
              min: 1,
              idle: 10000,
            },
            dialectOptions: {
              ssl: {
                require: true,
                // Ref.: https://github.com/brianc/node-postgres/issues/2009
                rejectUnauthorized: true,
              },
              keepAlive: true,
            },
            ssl: true,
          })

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

//* Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

//* RELACIONES
Videogame.belongsToMany(Genre, { through: 'VideogameGenre'} );
Genre.belongsToMany(Videogame, { through: 'VideogameGenre'} );

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};