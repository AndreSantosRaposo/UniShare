const {StatusCodes} = require('http-status-codes')
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BadRequestError = require('../errors/bad-request');
const UnauthenticatedError = require('../errors/unauthenticated');

//Function for user to create an account
async function register(req,res){
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPassword;

    //Create user
    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).json({user});
}

//Function to confirm account when user click email
async function confirmAccount(req,res){
    try{
        const payload = jwt.verify(req.params.token,process.env.EMAIL_SECRET)
        const id = payload.id;
        await User.findOneAndUpdate({confirmed:false,_id:id},{confirmed:true},{new:true,runValidators:true})
    }catch(err){
        console.log(err);
    }
    res.status(StatusCodes.OK).send('Account confirmed');
    //Fazer o redirect para a pagina le login ou assim
}

async function login(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }
    const user=  await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('Invalid credentials');
    }
    if(!user.confirmed){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const correctPass = await user.comparePassword(password);
    if(!correctPass){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const token = user.createJWT();
    console.log(token);
    res.json({nome:user.username,token});
}

module.exports = {register,confirmAccount,login};