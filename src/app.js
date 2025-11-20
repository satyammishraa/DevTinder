const express = require("express");
const connectDB = require("./config/database");

const User = require("./models/user");
const app = express();
app.use(express.json());

app.post("/signup", async (req,res) => {
//creating a new instance of a user model
   console.log(req.body)
       
  const user = new User(req.body);

        try {
             await user.save();
       res.send("user added successfully!");

        }
        catch (err) {
            res.status(400).send("error saving user" + err.message);
        }

    //    await user.save();
    //    res.send("user added successfully!");


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


