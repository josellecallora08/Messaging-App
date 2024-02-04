import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import http from 'http'
import socketIO from 'socket.io'
import mongoose from 'mongoose'
import user_route from './routes/user'
import session from 'express-session'
import MongoStore = require("connect-mongo");
dotenv.config()
const app = express()

const allowedOrigin = 'http://localhost:5173'; 
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(session({
  name:"token",
  secret: process.env.SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    maxAge: 60 * 60 * 1000, 
  },
  store: MongoStore.create({ mongoUrl: `${process.env.MONGODB_URI}`, autoRemove: 'native' }),
}));

app.use('/api/user', user_route)

mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is connected to DB and running on PORT: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
