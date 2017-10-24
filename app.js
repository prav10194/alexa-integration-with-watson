'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var router = express.Router();
var http = require('http').Server(app);
var unirest = require("unirest");

require('dotenv').config()

// You need it to get the body attribute in the request object.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))


var getCoordinates = function(locationName){
  var promise = new Promise(function(resolve, reject){
    var coordinateRequest = unirest("POST", "https://maps.googleapis.com/maps/api/geocode/json");
    var coordinates = {
      lattitude: "",
      longitude: ""
    }
    coordinateRequest.query({
      "address":  locationName,
      "key": process.env.GOOGLE_API_KEY
    });

    coordinateRequest.headers({
      "postman-token": "e9d5a4fd-245a-061e-aa42-21b3f09857a4",
      "cache-control": "no-cache"
    });


    coordinateRequest.end(function (coordinateResponse) {
      if (coordinateResponse.error) throw new Error(coordinateResponse.error);
      coordinates.lattitude = coordinateResponse.body.results[0].geometry.location.lat;
      coordinates.longitude = coordinateResponse.body.results[0].geometry.location.lng;

      return resolve(coordinates);

    });

  });
  return promise;
}

var getWeather = function(coordinates){
  var promise = new Promise(function(resolve, reject){

    var weatherRequest = unirest("GET", "https://"+process.env.WEATHER_API_USERNAME+":"+process.env.WEATHER_API_PASSWORD+"@twcservice.mybluemix.net:443/api/weather/v1/geocode/"+coordinates.lattitude+"/"+coordinates.longitude+"/observations.json");

    weatherRequest.headers({
      "postman-token": "7d01c940-7c64-52e5-7d1b-2337c34ae793",
      "cache-control": "no-cache"
      });

      weatherRequest.end(function (weatherResponse) {
        //console.log(weatherResponse);
        //if (weatherResponse.error) throw new Error(weatherResponse.error);

        console.log(weatherResponse.body.observation.temp);
        resolve(weatherResponse);
        });
  });
  return promise;


}

app.post("/weather", function(req, res){
	console.log("\n\n\n\nSubmit Called: \n\n\n\n");
  console.log(req.body.request.intent.slots.Weather.value);

  var locationName = req.body.request.intent.slots.Weather.value;

  getCoordinates(locationName).then(getWeather).then(function(weatherResponse){

      res.send({
          "version" : "1.0",
          "response" : {
            "outputSpeech" : {
              "type" : "SSML",
              "ssml" : "<speak> The weather in "+ locationName + " is <say-as interpret-as='number'>" + weatherResponse.body.observation.temp + " degrees Farenheit </say-as> </speak>",

            },
            "speechletResponse" : {
              "outputSpeech" : {
                "text" : "The weather in "+ locationName + " is " + weatherResponse.body.observation.temp
              },
              "shouldEndSession" : true
            }
          },
          "sessionAttributes" : {}
        });
  });
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
