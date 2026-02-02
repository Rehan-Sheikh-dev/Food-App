
export const userdataController = async (req,res) => {
res.status(201).send({ 
    message: "Welcome to protected route 🎉",
    user:req.user
 })
} 