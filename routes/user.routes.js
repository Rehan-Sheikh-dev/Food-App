import express from "express"
import { userTokenMiddleware } from "../middlewares/user.middleware.js";
import { getUserController } from "../controllers/user.controller.js";

const app = express.Router();

app.get("/profile",userTokenMiddleware,getUserController);

export default app  