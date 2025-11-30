// const adminAuth = (req,res,next) => {
//     console.log("admin auth is getting checked!");
//     const token = "xyz";
//     const isAdminAuthorized = token ==="xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("unauthorized request");

//     }
//     else {
//         next();
//     }
// };
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Token missing");
        }

        const decoded = jwt.verify(token, "devtinder@123");

        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send("Auth error: " + err.message);
    }
};

module.exports = { userAuth };
