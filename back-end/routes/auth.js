const express = require('express');
const router = express.Router();
require('dotenv').config();
const {register,confirmAccount} = require('../controllers/auth');

router.post("/register",register); //Rota para registar
router.post("/login")
router.get(`${process.env.BASE_URL}/confirmation/:token`,confirmAccount);

module.exports = router