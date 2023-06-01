import jwt from "jsonwebtoken";
import userModel from "../Model/authModel.js";


export const requiresignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.SCREAT_KEY);
    req.user=decode
    next();
  } catch (error) {
    console.log(error);
  }
};

export const Admin=async(req,res,next)=> {
    try{
        const user=await userModel.findById(req.user.id)
        if(!user){
            return res.status(201).send({
                message:'user not found',
                success:false
            })
        }
        else{
            res.status(200).send({
                success:true,
                data : {
                    id : user._id,
                    password : user.password,
                    email : user.email,
                    address : user.address,
                    token : user.token
                }
            })
            next()
    }
    }catch(error){
        res.status(500).send({
            success:false,
            message:'error in admin',
            error
        })
    }
}
