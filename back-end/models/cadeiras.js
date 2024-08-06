const mongoose = require('mongoose');


const CadeiraSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true],
        unique:true,
    },
    year:{
        type:String,
        enum:['1','2','3'],
    },
    semester:{
        type:String,
        enum:['1','2'],
    },
    category:{
        type:String,
        maxlength:65
    }
}) 

module.exports = mongoose.model('Cadeira',CadeiraSchema);