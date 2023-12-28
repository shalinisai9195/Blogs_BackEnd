import User from '.././models/UserSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getAuth = async(req,res,next)=>{
  try {
    const token = req.headers.token;
    if(!token){
      return res.status(401).json({error:'unauthorization'})
      
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    //console.log("line15",verifyToken);
    if(!verifyToken){
      return res.status(401).json({msg:"unauthorization"})
    }
    const auth = await User.findById(verifyToken.id)

    req.userId = verifyToken.id
    req.auth = auth
    next();
  } catch (error) {
    res.status(401).json({error:'authorization'})
  }

}

export default getAuth;