import userModel from "../models/user.model.js";

export const registerMiddleWare = async (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body

        if (!name || !email || !password || !phone || !address) {
            return res.status(500).send({ message: "All fields are required!" })
        }
        const findUser = await userModel.findOne({ email });
        if (findUser) return res.status(401).send({ message: "User Already Exist!" })
        next();
    } catch (error) {
        res.status(500).send(error);
    }
}


export const loginMiddleWare = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).send({ message: "All Fields are required!" });
        next();
    } catch (error) {
        res.status(500).send({ message: "something went wrong" })
    }
}


export const checkLoginMiddleware = async (req, res, next) => {
    const token = req.cookies.token; 
  if(!token) return res.status(401).send("Unexpected aur invalid token");
    next()
}