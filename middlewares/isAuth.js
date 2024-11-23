import jwt from 'jsonwebtoken'
import { User } from '../model/User.js';

export const isAuthenticated=(async(req,res,next)=>{
    try{
     const {token}=req.cookies;
     if(!token){
        
            return res
                .status(400)
                .json({success:false,message:"Login to access this route"})
           
     }
     const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
     const user=await User.findById(decoded._id);
     req.user=user;
     next()
    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})