import cookieParser from "cookie-parser";
import express from "express"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("<h1>This is the Home Page.</h1>")
})

app.listen(3000,function(){
    console.log("Server is running on port 3000")
})