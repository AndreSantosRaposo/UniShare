const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors'); //Lidar com os erros autonomamente

//Routers
const authRouter = require('./routes/auth');

//Connect to DB
const connectDb = require('./db/connectDb');

//Port
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json()); // Middleware to parse JSON bodies

//Routes
app.use('/api/v1/auth',authRouter);


async function start(){
    try{
        await connectDb(process.env.MONGO_URI);
        app.listen(3000,()=>{
            console.log(`Server listening to port ${port}`);
        })
    }catch(err){
        console.log(err);
    }
}

start()