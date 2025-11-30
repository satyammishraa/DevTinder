const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

authRouter.post("/signup", async (req,res) => {
//creating a new instance of a user model
    try { 
        validateSignUpData(req); 
        const { firstName,lastName,emailId,password } = req.body;
    //console.log(req.body)
    const passwordhash = await bcrypt.hash(password,10);
       
  const user =  new User({
    firstName, lastName,emailId,password:passwordhash,
  });

     
             await user.save();
       res.send("user added successfully!");

        }
        catch (err) {
            res.status(400).send("error saving user" + err.message);
        }

    //    await user.save();
    //    res.send("user added successfully!");


 });

 authRouter.post("/login", async (req, res) => {
     try {
         const { emailId, password } = req.body;
 
         const user = await User.findOne({ emailId });
         if (!user) {
             throw new Error("Invalid credentials");
         }
 
         const ispasswordValid = await bcrypt.compare(password, user.password);
         if (!ispasswordValid) {
             throw new Error("Invalid credentials");
         }
 
         // Generate JWT
         const token = jwt.sign(
             { userId: user._id },
             "devtinder@123",
             { expiresIn: "1d" }
         );
 
         res.cookie("token", token, {
             httpOnly: true,
             sameSite: "lax",
         });
 
         return res.send("login successful!!");
     }
     catch (err) {
         return res.status(400).send("error: " + err.message);
     }
 });

 authRouter.post("/logout", async(req,res) =>{
    res.cookie("token",null, {
          httpOnly: true,
        sameSite: "lax",
        expires:new Date(0)

    });
  return res.send(
    "Logged out successfully"
);

 });
 


module.exports = authRouter;