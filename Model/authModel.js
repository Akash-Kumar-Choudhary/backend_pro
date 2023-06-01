import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
})

export default mongoose.model('users' , userSchema)