const express = require('express');
const router = express.Router();
require('dotenv').config();
const bodyParser = require('body-parser'); //Serve para passar conteudo do HTML form para o req.body
const {register,confirmAccount,login} = require('../controllers/auth');

router.post("/register",bodyParser.urlencoded({extended:false}),register); //Usa o middleware bodyParser meter no req.body antes de ir para register
router.post("/login",login)
router.get(`/confirmation/:token`,confirmAccount);

module.exports = router