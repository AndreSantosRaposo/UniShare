const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Provide first name value'],
        maxlength:15,
    },
    lastName:{
        type:String,
        required:[true,'Provide last name value'],
        maxlength:15,
    },
    username:{
        type:String,
        required:[true,'Provide username value'],
        maxlength:20,
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please provide email value'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valid email'],
        unique:true, //Verifica se o email é único
    },
    password:{
        type:String,
        required:[true,'Please provide password value'],
        minlength:6
    },
    role:{
        type:String,
        default:'student'
    },
    favourites: {
        type: [String], // An array of ObjectIds referencing Class documents
        default: [], // Defaults to an empty array
    },
    confirmed:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        index:{expires:process.env.CONFIRMATION_LIFETIME}, //Se conta não for confirmada dentreo de 1 dia vai apagar user
    }
})


//Its a function to send the confirmation email to confirm account
UserSchema.post('save', async function(){
    try{
        const EMAIL_SECRET = process.env.EMAIL_SECRET;
        const email_token = jwt.sign({id:this._id},EMAIL_SECRET,{expiresIn:process.env.CONFIRMATION_LIFETIME});
        const url = `${process.env.BASE_URL}/api/v1/auth/confirmation/${email_token}`;
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
            port: 465, // Port for SMTP (usually 465)
            secure: true, // Usually true if connecting to port 465
            auth: {
                user: process.env.EMAIL_ADRESS, // Your email address
                pass: process.env.EMAIL_PASSWORD, // Password (for gmail, your app password)
            },
            tls: {
                rejectUnauthorized: false  // Disables certificate validation
            }
        });
        // Define and send message inside transporter.sendEmail() and await info about send from promise:
        //MUDAR ESTA PARTE DO HTML DO EMAIL NÃO ESTÁ MUITO BEM
        let info ={
            from: '"UNISHARE" <andresantosraposo@gmail.com>',
            to: this.email,
            subject: "Confirm account",
            html: `
                <h1>Please click the link to confirm your account</h1>
                <a href="${url}" target="_blank" style="color: blue; text-decoration: underline; course:pointer;">${url}</a>
            `,
        };
        await transporter.sendMail(info);
    }catch(err){
        console.log(err);
    }
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id,name:this.firstName,role:this.role},process.env.TOKEN_SECRET,{expiresIn:process.env.JWT_LIFETIME}); //É aqui que se cria payload
}

//Comparar as passwords
UserSchema.methods.comparePassword = async function(candidatePass){
    const isMatch = await bcrypt.compare(candidatePass, this.password);
    return isMatch;
}
module.exports = mongoose.model('User',UserSchema);