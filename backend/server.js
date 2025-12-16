const express=require("express");
const cors = require("cors");
require("dotenv").config();
const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("app is running on port 3000");
});

const port = process.env.PORT || 5432;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})