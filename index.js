const express = require("express");
const fs = require("fs");
const sharp = require('sharp');
const bodyParser = require("body-parser");
const axios = require('axios');
const moment = require('moment');
const request = require('request')
moment.locale('th');
const restService = express("");
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

restService.post("/webhook", function (req, res) {
  let msg = JSON.stringify(req.body)
  reply(msg)
  res.sendStatus(200)
});
function reply(msg) {
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {Qg8Oxy7Paskgsph62kxIuKCI91vu/AIBada8UU7x/FY9oGK5ad8y3Xac0BeYZOdQFF3zG6rTTznGdABacEB1AZM4Hi7UaQ5riscja3LjH7NHN2EPh3eKvrNl3ANkyNVPMxAevnBvfvXIB4+KfoPkcwdB04t89/1O/w1cDnyilFU=}'
  }
  let body = JSON.stringify({
      to: "U0ce66a9d268b3f1d81d04b30631acc87",
      messages: [{
          type: 'text',
          text: msg
      }]
  })
  request.post({
      url: 'https://api.line.me/v2/bot/message/push',
      headers: headers,
      body: body
  }, (err, res, body) => {
      console.log('status = ' + res.statusCode);
  });
}
restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
