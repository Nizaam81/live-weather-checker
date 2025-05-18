const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();


const apiKey = process.env.WEATHER_API_KEY;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, 
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000, 
    },
  })
);


const weather = require("./Routes/weatherRoute");
app.use("/", weather);


app.listen(process.env.PORT, () => {
  console.log("server is running");
});
