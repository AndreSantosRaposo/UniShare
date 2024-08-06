const express = require('express');
const router = express.Router();
require('dotenv').config();
const {criarCadeira,getAllCadeiras} = require('../controllers/cadeiras')

router.post('/criar',criarCadeira);
router.get('/buscar',getAllCadeiras);

module.exports = router