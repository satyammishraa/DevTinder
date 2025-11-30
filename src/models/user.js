const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        maxLength: 16,
        minLength: 4
    },
    lastName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    photoUrl: {
        type: String,
        default:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Leonardo_Dicaprio_-_World_Premiere_%E2%80%98One_Battle_after_Another%E2%80%99.jpg/960px-Leonardo_Dicaprio_-_World_Premiere_%E2%80%98One_Battle_after_Another%E2%80%99.jpg",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("invalid photo URL " + value);
            }
        }
    }

},
{
    timestamps: true   // ✔ Correct place
});

module.exports = mongoose.model("User", userSchema);
