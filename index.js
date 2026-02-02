import cookieParser from "cookie-parser";
import express from "express"
import dotenv from "dotenv"
import DbConnect from "./db/db.js";
import { fileURLToPath } from "url";
import path from "path";
import chalk from "chalk";
import cors from "cors"
import auth from "./routes/auth.routes.js"

dotenv.config({path:'./.env'});

// create controller of user

(async()=>{
    try {
        await DbConnect(); 
        console.log("MongoDb Connected SuccessFully!!");
    } catch (error) {
        console.log("MongoDb connection failed:",error);
        process.exit(1);
    }
})();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(cors());
app.use("/user",auth)

app.get("/",(req,res)=>{
    res.send("<h1>This is the Home Page.</h1>")
})

app.listen(process.env.PORT,function(){
    console.log(chalk.white.bgGreen.bold((`Server is running on port ${process.env.PORT}`)))
})