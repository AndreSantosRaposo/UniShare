const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/authentication');
require('dotenv').config();

const {getFavourite,addFavourite,removeFavourite,getUserInfo} = require("../controllers/user");

router.get("/getFavourite",authenticationMiddleware,getFavourite);
router.put("/addFavourite",authenticationMiddleware,addFavourite);
router.put("/removeFavourite",authenticationMiddleware,removeFavourite); 
router.get("/getInfo",authenticationMiddleware,getUserInfo);   
module.exports = router