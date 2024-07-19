const express = require('express');
const router = express.Router();
require('dotenv').config();
const {register,confirmAccount,login} = require('../controllers/auth');

router.post("/register",register); //Rota para registar
router.post("/login",login)
router.get(`/confirmation/:token`,confirmAccount);

module.exports = router