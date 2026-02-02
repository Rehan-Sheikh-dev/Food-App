import express from "express"
import { createdUser,loginUser } from "../controllers/auth.controller.js";
import { loginMiddleWare,registerMiddleWare } from "../middlewares/auth.middleware.js"
const app = express.Router()

app.post('/register',registerMiddleWare,createdUser)
app.post('/login',loginMiddleWare,loginUser)

export default app;