import jwt from "jsonwebtoken"

export const userTokenMiddleware = async(req,res,next) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if(!token) return res.status(500).send({message:"Unauthorized user!"})
     
        try {
            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).send("Invalid or expired token!")
        }
}