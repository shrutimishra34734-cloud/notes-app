const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// DATABASE CONNECTION

mongoose.connect("mongodb://127.0.0.1:27017/notesapp")

.then(() => {

    console.log("MongoDB Connected");

})

.catch((error) => {

    console.log("Mongo Error:", error);

});


// ROUTES

app.use("/api/notes", require("./routes/notes"));


// SERVER

app.listen(5000, () => {

    console.log("Server Running On Port 5000");

});