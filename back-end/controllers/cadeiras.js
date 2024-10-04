const {StatusCodes} = require('http-status-codes')
const Cadeira = require('../models/cadeiras');


async function criarCadeira(req,res){  //Nornalmente uso o postman para adicionar as cadeiras, pois os users não o fazem
    const cadeira = await Cadeira.create(req.body);
    res.status(StatusCodes.CREATED).json({cadeira});
}

async function getAllCadeiras(req,res){
    const Cadeiras = await Cadeira.find({});
    res.status(StatusCodes.OK).json({Cadeiras});
}

async function getCadeirasComId(req, res) { //Este é a função / controller usado como loader para tudo na página do perfil
    const { page = 1, limit = 6 } = req.query;  // Paginação
    const idsArr = req.params.ids.split(',');
    
    const cadeiras = await Cadeira.find({ _id: { $in: idsArr } })
                                  .skip((page - 1) * limit)
                                  .limit(Number(limit));
    
    const totalCadeiras = await Cadeira.countDocuments({ _id: { $in: idsArr } });
    const totalPages = Math.ceil(totalCadeiras / limit);

    res.status(StatusCodes.OK).json({ cadeiras, totalPages });
}


module.exports = {criarCadeira,getAllCadeiras,getCadeirasComId}  