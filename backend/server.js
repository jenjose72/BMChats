import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDb.js';

const app= express();
const PORT=process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.use('/api/auth',authRoutes);

app.use('/api/messages',messageRoutes);

app.use('/api/users',userRoutes);

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT} && hosted on http://localhost:${PORT}`); 
});