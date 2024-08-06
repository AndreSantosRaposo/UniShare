const {StatusCodes} = require('http-status-codes')
const Cadeira = require('../models/cadeiras');

async function criarCadeira(req,res){  //Nornalmente uso o postman para adicionar as cadeiras, pois os users não o fazem
    const cadeira = await Cadeira.create(req.body);
    res.status(StatusCodes.CREATED).json({cadeira})
}

async function getAllCadeiras(req,res){
    const Cadeiras = await Cadeira.find({})
    // const totalCadeiras = await Cadeira.countDocuments();
    res.status(StatusCodes.OK).json({Cadeiras})
}

module.exports = {criarCadeira,getAllCadeiras}  