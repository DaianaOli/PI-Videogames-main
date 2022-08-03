require('dotenv').config();
const { Router } = require('express');
const router = Router();

//Importo los routers;
const videogames = require('./videogames');
const videogame = require('./videogame');
const genres = require('./genres');

//Configuro los routers
router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/videogame', videogame);

module.exports = router;