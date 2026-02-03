import userModel from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const createdUser = async (req, res) => {
   try {
      const { email, password, name, phone, address } = req.body;
      const hash = await bcrypt.hash(password, 12)
      const user = await userModel.create({
         email,
         name,
         password: hash,
         phone,
         address
      })
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })
      res.cookie("token", token, { httpOnly: true })
      res.status(201).send({ message: "User created successfully!!", data: user })

   } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Internal Server Error", data: error });
   }
}

export const loginUser = async (req, res) => {
   const { email, password } = req.body;
   const user = await userModel.findOne({ email });
   if (!user) return res.status(401).send({ message: "User doesn't exist!" });
   const result = await bcrypt.compare(password, user.password);
   if (!result) return res.status(401).send("Password is incorrect!!");
   user.password = undefined
   const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
   res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
   });
   res.status(201).send({ message: "User loggedin successfully!", data: user });
}

export const logoutUser = async (req, res) => {
   res.cookie("token",""); ;
  res.status(201).send({message:"User logout successfully!!"})
}

export const resetUserPassword = async (req,res) => {
   try {
      const {email,newPassword} = req.body;
      if(!email || !newPassword ) return res.status(502).send("All fields are required!!");
      const user = await userModel.findOne({email});
      if(!user) return res.status(401).send({
         message:"User not found!!",
         success:true
      })
       const salt = bcrypt.genSaltSync(12);
       const hashPassword = await bcrypt.hash(newPassword,salt);
       user.password = hashPassword;
       await user.save()
         res.status(200).send({
         message: "Password reset successfully!",
         success: true  
      });
   } catch (error) {
      res.status(500).send({
            message:"user Password reset failed!",
            success:false,
            error
         })
   }
}  