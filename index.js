import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import ConnectDb from './DB/db.js';
import userRouter from './routers/user.js';
import blogsRouter from './routers/blog.js';

dotenv.config();
ConnectDb();

const port = process.env.PORT || 4545;
const app = express();

app.use(express.json());
app.use(cors({credentials: true}));

//using routes
app.use('/api/user',userRouter);
app.use('/api/blog',blogsRouter);

app.listen(port,()=>{
  console.log(`App listening a Port ${port}`);
})