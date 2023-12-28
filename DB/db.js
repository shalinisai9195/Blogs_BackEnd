import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const ConnectDb = async()=>{
   try {
    const db_connect = await mongoose.connect(process.env.DB_URL);
    console.log('MongoDb conneted successfully')
    return db_connect;
    
   } catch (error) {
      console.log('Error in connect DB',error)
   }
}

export default ConnectDb;

