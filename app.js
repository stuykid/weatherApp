const express = require("express");
const https = require("https"); // native way to use "get" for an external website
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;



app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    //console.log(req.body.cityName);
    //console.log("Post req received!");

    const query = req.body.cityName;
    const apiKey = "728383971be9607e74f42c00956ea897";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);                                                   // request to an external server

        response.on("data", function(data){
            const weatherData = JSON.parse(data)                                            // transform data into JSON
            //console.log(weatherData);
            let temp = weatherData.main.temp;  
            temp = Math.round((temp * 9/5) + 32);                                           // get temperature in fahrenheit
            const weatherDescription = weatherData.weather[0].description;                  // get description
            const icon = weatherData.weather[0].icon;                                       // get weather icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon +  "@2x.png";      // get weather icon image

            console.log(icon);                                                              // checking data in the console
            console.log(temp);
            console.log(weatherDescription);
            res.write("<p>The weather is currently " + weatherDescription + ". </p>")       // display weather description
            res.write("<h1>The temperature in "  + query + " is " + temp + " degrees Celsius.</h1>")   // can have multiple res.write()
            res.write("<img src=" + imageURL + ">");                                        // display weather icon
            res.send()                                                                      // can only have 1 res.send()

    }); 
})
});






app.listen(port, function(){
    console.log("Server is running on port 3000.");
});

                        /* JSON.stringify(object) opposite of JSON.parse... will compact data to a single line */ 