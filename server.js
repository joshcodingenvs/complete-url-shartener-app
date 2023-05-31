// import required modules/packages
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");

// import routes
const appRoutes = require("./routes/routes");

// dotenv configurations
dotenv.config();

// connection to database
mongoose.set("strictQuery", false);
if(process.env.MODE !== "production"){
    console.log(`MODE: ${process.env.MODE}`);
    mongoose.connect(process.env.MONGODB_URI_DEV).then(()=>{
        console.log("Connected to Database");
    }).catch((err)=>{
        console.error("Failed to connect to DAtabase", err);
    });
}else{
    console.log(`MODE: ${process.env.MODE}`);
    mongoose.connect(process.env.MONGODB_URI_PROD).then(()=>{
        console.log("Connected to Database");
    }).catch((err)=>{
        console.error("Failed to connect to DAtabase", err);
    });
}

// app instance
const app = express();

// app configurations
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes setup
app.use("/", appRoutes);

// server instance
const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log(`Server up and running on port: ${process.env.PORT}`);
});