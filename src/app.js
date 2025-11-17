const express = require("express");

const app = express();


app.get("/user",(req,res,next) => {
   // res.send("OKASHII ASHIO KIDDA!");
    next();
},
(req,res,next) => {
   // res.send("sokome ashio kidda");
    next();
},
(req,res,next) => {
    res.send("sokome1 ashio kidda");
    next();
});


 app.listen(5000, () => {
    console.log("server is running on port 5000...");
});