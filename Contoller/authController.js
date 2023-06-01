import userModel from "../Model/authModel.js";
import { comparePassword, HassPassword } from "../helper/authHelper.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { password, email, address } = req.body;
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.send({
        success: true,
        message: "already register please login",
      });
    }
    const hassedPassword = await HassPassword(password);
    const users = await new userModel({
      password: hassedPassword,
      email,
      address,
    }).save();
    res.send({
      success: true,
      message: "User Register Successful",
      users,
    });
  } catch(error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "errror in register",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "error in login",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }
    const token = await jwt.sign({ id: user._id }, process.env.SCREAT_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      users: {
        password: user.password,
        email: user.email,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};


export const singleAuthController = async(req , res) =>{
    try{
        const {id} = req.params
        const user = await userModel.findById(id)
        res.status(200).send({
            success:true,
            message:'successfully get the user',
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting data'
        })
    }
}
export const testController = (req, res) => {
    res.status(200)
  };