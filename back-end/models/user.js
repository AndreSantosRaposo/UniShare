const mongoose = require('mongoose');
require('dotenv').config();
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
        //unique:true, //Verifica se o email é único
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
    confirmed:{
        type:Boolean,
        default:false,
    }
})

//Its a function to send the confirmation email to confirm account
UserSchema.post('save', async function(){
    try{
        const EMAIL_SECRET = process.env.EMAIL_SECRET;
        const email_token = jwt.sign({id:this._id},EMAIL_SECRET,{expiresIn:'1d'});
        const url = `${process.env.BASE_URL}/confirmation/${email_token}`;

        console.log(process.env.EMAIL_ADRESS);
        console.log(process.env.EMAIL_PASSWORD);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
            port: 465, // Port for SMTP (usually 465)
            secure: true, // Usually true if connecting to port 465
            auth: {
                user: process.env.EMAIL_ADRESS, // Your email address
                pass: process.env.EMAIL_PASSWORD, // Password (for gmail, your app password)
                // ⚠️ For better security, use environment variables set on the server for these values when deploying
            },
            tls: {
                rejectUnauthorized: false  // Disables certificate validation
            }
        });
        // Define and send message inside transporter.sendEmail() and await info about send from promise:
        let info ={
            from: '"UNISHARE" <andresantosraposo@gmail.com>',
            to: this.email,
            subject: "Confirm account",
            html: `
            <h1>Please click the link to confirm your account <a href="${url}">Verify Email</a></h1>
            `,
        };
        await transporter.sendMail(info);
    }catch(err){
        console.log(err);
    }
})

module.exports = mongoose.model('User',UserSchema);