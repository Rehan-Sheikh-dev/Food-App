import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

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


export const logoutMiddleWare = async (req, res, next) => {
    console.log(req.user)
    try {
        if (!req.user) {
            return res.status(401).send({
                message: "Please login first!",
                success: false
            })
        }
        next();
    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            success: false
        })
    }
}