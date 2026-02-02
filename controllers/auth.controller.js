import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
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
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY)
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
    user.password=undefined
   const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
   res.cookie("token", token);
   res.status(201).send({ message: "User loggedin successfully!", data: user });
}