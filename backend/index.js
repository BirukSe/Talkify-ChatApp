import express from "express";
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
const app=express();
import dotenv from "dotenv";
import auth from './routes/auth.js';
import mess from './routes/mess.js';
import bodyParser from 'body-parser';
import message from './routes/message.js';
app.use(cookieParser())
app.use(express.json())
dotenv.config();
import cors from 'cors';
app.use(cors({
    origin: 'http://localhost:3000' // Allow your frontend to access the backend
}));

const __dirname = path.resolve();
const PORT=process.env.PORT;
const MongoConnect= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to mongodb")
    }
    catch(err){
        console.log(err)}}

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use('/auth', auth);
app.use('/show', mess);
app.use('/api', message);


app.listen(PORT, ()=>{
    MongoConnect();
    console.log(`Server listening on port ${PORT}`)
})