const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation")
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req,res) => {
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

//  app.post("/login", async(req,res) => {

//     try{
//         const {emailId,password } = req.body;

//         const user = await User.findOne({emailId: emailId});
//         if(!user){
//             throw new Error("invalid credentials");
//         }

//             const ispasswordValid = await bcrypt.compare(password,user.password);

//             if(ispasswordValid){
               
//                 res.cookie("token","alldidaldu"); 
//                 res.send("login successful!!");
//             }
//             else {
//                 throw new Error("Invalid credentials");
//             }
        

//     }
//     catch (err){
//         res.status(400).send("error: " + err.message);
//     }
//  });
app.post("/login", async(req,res) => {
    try{
        const { emailId, password } = req.body;

       

        const user = await User.findOne({ emailId });
       

        if(!user){
            throw new Error("invalid credentials");
        }

       

        const ispasswordValid = await bcrypt.compare(password, user.password);
       

        if(ispasswordValid){
            res.cookie("token","alldidaldu"); 
            return res.send("login successful!!");
        }

        throw new Error("Password incorrect");

    }
    catch (err){
        return res.status(400).send("error: " + err.message);
    }
});




 app.get("/feed",async (req,res) =>{

    const useremail = req.body.emailId;

    try{
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("something went wrong ");
    }

 });

 app.get("/profile", async (req,res) => {
    const cookies = req.cookies;
    console.log("cookies");
    res.send("reading cookies");
 })

app.delete("/deluser", async (req,res) => {
    const userId = req.body.userId;

    
    try{

        const user = await User.findByIdAndDelete(userId);

        res.send("user delete successfully");
    }
    catch (err) {
        res.status(400).send("something went wrong");
    }

});
app.patch("/upduser", async (req,res) => {
    const userId = req.body.userId;
const data = req.body;
    
    try{

        const user = await User.findByIdAndUpdate({_id:userId},data);

        res.send("user updated successfully");
    }
    catch (err) {
        res.status(400).send("something went wrong");
    }

});



connectDB()
.then(() => {
    console.log("database connection established");
    
app.listen(5000, () => {
    console.log("server is running on port 5000...");
});
})
.catch((err) => {
    console.error("Database cannot be connected!!");
});


