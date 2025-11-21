const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
 
    firstName: {
        type: String,
        required : true,
        maxLength: 6,
        minLength: 4
    },
    lastName: {
        type: String,
         required : true,

    },
    emailId: {
        type: String,
         required : true,
         lowercase : true,
         unique : true,
         trim: true,
        //  validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new error("invalid email address: "+ value);
        //     }
        //  }

    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }


});


module.exports = mongoose.model("User",userSchema);