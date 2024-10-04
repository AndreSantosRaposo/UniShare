const express = require('express');
const router = express.Router();
const {criarCadeira,getAllCadeiras,getCadeirasComId} = require('../controllers/cadeiras')

router.post('/criar',criarCadeira);
router.get('/buscar',getAllCadeiras);
router.get('/buscarFavourites/:ids',getCadeirasComId);

module.exports = router