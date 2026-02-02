import express from "express"
import { createdUser,loginUser } from "../controllers/user.controller.js";
import { loginMiddleWare,registerMiddleWare } from "../middlewares/user.middleware.js"
const app = express.Router()

app.post('/register',registerMiddleWare,createdUser)
app.post('/login',loginMiddleWare,loginUser)

export default app;