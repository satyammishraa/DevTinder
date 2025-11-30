const express = require('express');
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const { validateeditProfiledata } = require("../utils/validation");

profileRouter.get("/profile", userAuth,async (req,res) => {
   try{ 
    const user = req.user;
    if(!user){
        throw new Error("user not exists");
    }

   res.send(user);
}
catch (err){
    res.status(400).send("Error" + err.message);
}

 });

profileRouter.patch("/profile/edit",userAuth,async (req,res) =>{
    try{
         const iseditvalid = validateeditProfiledata(req);
        if(!iseditvalid){
            throw new Error("invalid update request");
        }
        const loggedinuser = req.user;
        Object.keys(req.body).forEach((key) => (loggedinuser[key]=req.body[key]));
       await loggedinuser.save();
        res.send("profile updated successfully");


    }
    catch(err){
        res.status(400).send("ERROR" + err.message);

    }

    //const loggedinuser = req.body;
});

profileRouter.patch("/profile/forgotpassword",userAuth,async (req,res) => {
    try{
        const{oldpassword,newpassword} = req.body;
        if(!oldpassword|| !newpassword){
            throw new Error("invalid request");
        }
        const user = req.user;
        const isMatch = await bcrypt.compare(oldpassword,user.password);
        if(!isMatch){
            res.status(400).send("invalid password");
        }

         if (!validator.isStrongPassword(newpassword)) {
            return res.status(400).send(
                "New password is not strong enough"
            );
        }
         const hashedPassword = await bcrypt.hash(newpassword, 10);

        // 6. Save updated password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).send(
            "Password updated successfully"
        );

    }
    catch(err){
         res.status(400).send("ERROR" + err.message);

    }
});

 module.exports = profileRouter;
