//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){//getting post request
  const city =req.body.cityName;
  const apiKey = "1c8e9662a55b43ccd3dd73ae919cadc1";
  const units = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+units;
  https.get(url,(response)=>{
    console.log(response.statusCode);

    response.on("data",(data)=>{ //callback function that contain the data that we get from api request

      const weatherdata= JSON.parse(data); //turning into js objects
      const temp = weatherdata.main.temp; // gathering data
      const des = weatherdata.weather[0].description;

      const icon = weatherdata.weather[0].icon;
      const imgUrl ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<img src="+imgUrl+">");
      res.write("The temperature in "+city+" is " + temp + "deg celcius"+"<br>");
      res.write("The weather in "+city+" is " + des);
      res.send();
    });
  });
//  only 1 send

});




app.listen(3000,()=>{
  console.log("server started");
});
