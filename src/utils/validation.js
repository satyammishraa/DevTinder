const validator = require("validator");

const validateSignUpData = (req) => {
    const 
    {   firstName,lastName,emailId , password} = req.body;

    if(!firstName || !lastName){
        throw new error("Name is not valid!!");
    }
    else if(!validator.isEmail(emailId)){
         throw new Error("Email is not valid!!");

    }
    else if(!validator.isStrongPassword(password)){
         throw new Error("password is not strong!!");
    }


};

const validateeditProfiledata = (req) => {
    const allowedupdates = [
        "firstName","lastName","gender","age","photoUrl"
    ];
    const updates = Object.keys(req.body);
    const iseditvalid = updates.every((key) => allowedupdates.includes(key));
    return iseditvalid;

}
module.exports = {
    validateSignUpData,validateeditProfiledata
};
