const express = require("express");

const app = express();

app.get("/user", (req,res) => {
    res.send({ firstname: "satyam",lastname:"mishra"});

});

app.post("/user",async (req,res) => {
    console.log(req.body);
    //saving data to db
    res.send("data successfully saved to the database!");

});

app.delete("/user", (req,res) => {
    res.send("deleted successfully!");
});





app.use("/",(req,res) => {
    res.send("hilaooo na");
}
);


//  app.use((req,res) => {
//      res.send("Hello fuck yes from the server!");
//  });



 app.listen(5000, () => {
    console.log("server is running on port 5000...");
});

// app.listen(3000, () => {
//     console.log("server is running on port 3000...");

// });