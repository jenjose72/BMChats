import express from 'express';
import dotenv from 'dotenv';
import { app,server } from './socket/socket.js';
import cookieParser from 'cookie-parser';


import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDb.js';




dotenv.config();
const PORT=process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.use('/api/auth',authRoutes);

app.use('/api/messages',messageRoutes);

app.use('/api/users',userRoutes);

server.listen(PORT,async ()=>{
    await connectToMongoDB();
    console.log(`Server running on port ${PORT} && hosted on http://localhost:${PORT}`); 
});