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

        res.redirect('http://localhost:5173/auth/confirmar')  //Meter isto como relative path maybe;
    }

    //Function to confirm account when user click email
    async function confirmAccount(req,res){
        try{
            const payload = jwt.verify(req.params.token,process.env.EMAIL_SECRET)
            const id = payload.id;
            await User.findOneAndUpdate({confirmed:false,_id:id},{confirmed:true,$unset: { createdAt: "" } },{new:true,runValidators:true}) //Retirar a data de validade
        }catch(err){
            console.log(err);
        }
        res.redirect('http://localhost:5173/auth/login')  //Meter isto como relative path maybe;
        //Fazer o redirect para a pagina le login ou assim
    }

    async function login(req,res){
        const {email,password} = req.body;
        if(!email || !password){
            throw new BadRequestError('Please provide email and password');
        }
        const user=  await User.findOne({email});
        if(!user){
            console.log("aquii")
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
        res.status(StatusCodes.OK).json({token})
    }

    module.exports = {register,confirmAccount,login};