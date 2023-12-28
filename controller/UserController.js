import Users from '../models/UserSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async(req,res)=>{
  try {

    const {name,email,password} = req.body;
    const hashPwd =await bcrypt.hash(password,10);
    const user = await Users.create({name,email,password:hashPwd})
    res.status(200).json({msg:'user register successfully',user:user});
   

  } catch (error) {
    res.status(500).json({msg:'Error in create user'});
  }
}

export const getallUser= async(req,res)=>{
  try {
    const getUsers = await Users.find();
    if(getUsers){
      res.status(200).json({msg:"Display all users",getUsers});
    }else{
      res.status(404).json({msg:"user side error"});
    }
    
  } catch (error) {
    res.status(500).json('Error in server')
  }
}

export const exituser = async(req,res)=>{
  try {
  const {email,password} = req.body
    const exUser = await Users.findOne({email});
    if(!exUser){
      res.status(404).json({msg:'user not found'})
    }
    const comparePwd = bcrypt.compare(password,exUser.password);
    if(!comparePwd){
      res.status(400).json({msg:"Incorrect pwd"});
    }
    const token = jwt.sign({id:exUser._id,name:exUser.name},process.env.SECRET_KEY)
   res.status(200).json({msg:'user logged in',token:token}); 

  } catch (error) {
    res.status(500).json('Error in server',error)
  }
}
export const authUser = (req, res)=>{
  try {
     res.status(200).json(req.auth)
    
  } catch (error) {
    res.status(500).json('Error in server',error)
  }

}

