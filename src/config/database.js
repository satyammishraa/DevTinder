const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
  "mongodb+srv://satyam20220045_dbuser:w6veizgWswz5Pq0S@cluster0.768zgg2.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0"
)
};


module.exports = connectDB;

// connectDB()
// .then(
//     () => {
//         console.log("database connection established");
//     })
//     .catch(
//         (err) => {
//             console.error("db cannot be connected");

//         }
//     );

//mongodb+srv://satyam20220045_dbuser:w6veizgWswz5Pq0S@cluster0.768zgg2.mongodb.net/?appName=Cluster0