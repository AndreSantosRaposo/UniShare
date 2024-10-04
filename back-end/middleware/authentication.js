const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthenticatedError = require("../errors/unauthenticated");

function auth(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user= {userId:payload.userId,name:payload.name,role:payload.role} //Estes são os nomes que eu escolhi ao criar no models/users com jwt.sign()
        next()
    }catch(err){
        throw new UnauthenticatedError('Authentication Invalid');
    }
}

module.exports = auth;