import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
      },
      password:{
        type:String,
        required:true,
        minLength:4
      },
      address:{
        type:Array,
      },
      phone:{
        type:Number,
        required:true
      },
      userType:{
        type:String,
        required:true,
        default:'client',
        enum:['client','vendor','driver','admin']
      },
      profile:{
        type:String,
        default:'/images/user.png'
      }
},{timestamps:true})

const userModel = new mongoose.model("user",userSchema);

export default userModel;