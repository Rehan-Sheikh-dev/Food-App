import express from "express"
import {
    createdUser,
    loginUser,
    logoutUser,
    resetUserPassword
}
    from "../controllers/auth.controller.js";
import {
    loginMiddleWare,
    registerMiddleWare,
    checkLoginMiddleware
}
    from "../middlewares/auth.middleware.js"
const app = express.Router()

app.post('/register', registerMiddleWare, createdUser)
app.post('/login', loginMiddleWare, loginUser)
app.post('/logout', checkLoginMiddleware, logoutUser)
app.post('/resetPassword', checkLoginMiddleware,resetUserPassword)

export default app; 