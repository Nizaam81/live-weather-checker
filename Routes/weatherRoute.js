const express = require("express")

const router = express.Router()
const weatherController = require("../controller/weatherController")



router.get("/", weatherController.load)
router.post("/weather",weatherController.getWeather);


module.exports=router