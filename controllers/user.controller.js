import userModel from "../models/user.model.js"

export const getUserController = async (req,res) => {
try {
  const user = await userModel.findOne({email:req.user.email})
    if(!user) return res.status(500).send({
        success:false,
        message:"User does not exist!!",
    });
    user.password =undefined;
   return res.status(200).send({
        message:"User Get Successfully!!",
        success:true,
        user
    })

} catch (error) {
    res.status(404).send({
        message:"User not Found",
        success:false,
        error
    })
}
} 
