

const load = async (req, res) => {
  try {
    res.render("index"); // if using EJS or template engine
  } catch (error) {
    console.error("Error in rendering:", error);
    res.status(500).send("Error loading page.");
  }
};

const getWeather = async (req, res) => {
  try {
    const city = req.body.city;
    console.log("City received:", city);

    if (!city) {
      return res.status(400).json({ error: "City name is required." });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data)
      

    if (data.cod !== 200) {
      return res.status(404).json({ error: data.message });
    }

    res.json({
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
    });
    
  } catch (error) {
    console.error("Weather API error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong with the weather API." });
  }
};

module.exports = {
  load,
  getWeather,
};
