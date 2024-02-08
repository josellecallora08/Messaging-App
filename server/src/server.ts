import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import user_route from './routes/user'
import message_route from './routes/message'

import {Server} from 'socket.io'
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
app.use(cookieParser())
app.use('/api/user', user_route)
app.use('/api/message', message_route)
mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is connected to DB and running on PORT: ${process.env.PORT}`);
    })
    const io = new Server(server,{
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:5173"
      }
    })
    io.on("connection", (socket) => {
        console.log("Connected to Socket.io");
        socket.on("setup", (userData) => {
          socket.join(userData._id);
          socket.emit("connected");
        })
        socket.on("disconnect", () => {
          console.log("Disconnected")
        })

        socket.on("send-message", (message) => {
          socket.emit(`${message}`)
        })
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
