const express = require("express");
const fs = require("fs");
const sharp = require('sharp');
const bodyParser = require("body-parser");
const axios = require('axios');
const moment = require('moment');
moment.locale('th');
const restService = express("");
const publicDir = require('path').join(__dirname, '/public');
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(express.static(publicDir));
restService.use(bodyParser.json());

restService.post("/webhook", function (req, res) {
  // const toTwoDigits = num => (num < 10 ? "0" + num : num);
  // let today = new Date();
  // let year = today.getFullYear();
  // let year_TH = parseInt(today.getFullYear()) + 543;
  // let month = toTwoDigits(today.getMonth() + 1);
  // let day = toTwoDigits(today.getDate());
  // let ToDay = moment().format('LL');
  // let date_now = `${year}-${month}-${day}`;

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {Qg8Oxy7Paskgsph62kxIuKCI91vu/AIBada8UU7x/FY9oGK5ad8y3Xac0BeYZOdQFF3zG6rTTznGdABacEB1AZM4Hi7UaQ5riscja3LjH7NHN2EPh3eKvrNl3ANkyNVPMxAevnBvfvXIB4+KfoPkcwdB04t89/1O/w1cDnyilFU=}'
  };
  let body = JSON.stringify({
    to: "U0ce66a9d268b3f1d81d04b30631acc87",
    messages: [{
        "type": "text",
        "text": JSON.stringify(req.body)
    }]
  });
  
  request.post({
    url: 'https://api.line.me/v2/bot/message/push',
    headers: headers,
    body: body
  }, function (err, res, body) {
    console.log('status = ' + res.statusCode);
  });
});


restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
