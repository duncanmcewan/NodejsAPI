const express = require("express");
const app = express();
const lh = "127.0.0.1";
const port = 3007;
var bodyParser = require('body-parser')
var request = require('request');


app.use(express.static(__dirname + "/"));
//  extended true means KVP can be String or Array
//  extended true means that KVP can be of any type
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, resp) {
  resp.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, resp) {
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;

    var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalUrl = baseUrl+crypto+fiat;
    var convNum = req.body.convNum;

    request(finalUrl, function (error, response, body) {
      var data = JSON.parse(body);
      var bid = data.bid;
      var ask = data.ask;
      var last = data.last;
      var low = data.low;
      var high = data.high;
      var timeStamp = data.display_timestamp;
      var outData = bid*convNum;

      resp.write("<h1>BID"+"&nbsp;"+":"+"&nbsp;"+bid+"</h1>");
      resp.write("<h1>ASK"+"&nbsp;"+":"+"&nbsp;"+ask+"</h1>");
      resp.write("<h1>LAST"+"&nbsp;"+":"+"&nbsp;"+last+"</h1>");
      resp.write("<h1>HIGH"+"&nbsp;"+":"+"&nbsp;"+high+"</h1>");
      resp.write("<h1>TIME STAMP"+"&nbsp;"+":"+"&nbsp;"+timeStamp+"</h1>");
      resp.write("<h3>CONV THING"+"&nbsp;"+":"+"&nbsp;"+outData+"</h3>");
      resp.send();
      //console.log("Error:", error); // Print the error if one occurred
      //console.log("StatusCode:", response && response.statusCode); // Print the response status code if a response was received
      //console.log("Body:", body); // Print the HTML for the Google homepage.
    });

});




/*
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
*/


/*
  resp.write("<h1>Hi"+"&nbsp;"+name+"&nbsp;"+"Your result is"+"&nbsp;"+result+"</h1>");
  resp.write("<h1>"+name+"&nbsp; - Your SuperHero is &nbsp;"+superheroes.random()+"</h1>");
  resp.send();
  */





app.listen(port, lh, function(req, resp) {
  console.log("Application is up and running fine on port : "+port);
});
