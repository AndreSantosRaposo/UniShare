const mongoose = require('mongoose');

//Função para me conectar à DB
function connectDB(url){
    return mongoose.connect(url);
}

module.exports = connectDB;