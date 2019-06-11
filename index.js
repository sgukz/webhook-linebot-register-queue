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
  let reply_token = req.body.events[0].replyToken
  reply(reply_token)
  res.sendStatus(200)
});

function reply(reply_token) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {Qg8Oxy7Paskgsph62kxIuKCI91vu/AIBada8UU7x/FY9oGK5ad8y3Xac0BeYZOdQFF3zG6rTTznGdABacEB1AZM4Hi7UaQ5riscja3LjH7NHN2EPh3eKvrNl3ANkyNVPMxAevnBvfvXIB4+KfoPkcwdB04t89/1O/w1cDnyilFU=}'
  };
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: 'Hello'
    },
    {
      type: 'text',
      text: 'How are you?'
    }]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode);
  });
}
restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
