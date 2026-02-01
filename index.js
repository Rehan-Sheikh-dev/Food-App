import cookieParser from "cookie-parser";
import express from "express"
import dotenv from "dotenv"
import DbConnect from "./db/db.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

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
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("<h1>This is the Home Page.</h1>")
})

app.listen(process.env.PORT,function(){
    console.log(`Server is running on port ${process.env.PORT}`)
})