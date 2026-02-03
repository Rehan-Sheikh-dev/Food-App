import express from "express"
import { createdUser,loginUser,logoutUser } from "../controllers/auth.controller.js";
import { loginMiddleWare,registerMiddleWare,logoutMiddleWare } from "../middlewares/auth.middleware.js"
const app = express.Router()

app.post('/register',registerMiddleWare,createdUser)
app.post('/login',loginMiddleWare,loginUser)
app.post('/logout',logoutMiddleWare,logoutUser)

export default app; 