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
  let userMessage = req.body.events[0].message.text;
  let userId = req.body.events[0].source.userId;
  if (userMessage == "ลงทะเบียน") {
    let formatMessage = {
      "type": "imagemap",
      "baseUrl": "https://passathorn.files.wordpress.com/2019/07/linebot-imagemap-register.jpg?w=1040",
      "altText": "ลงทะเบียนออนไลน์",
      "baseSize": {
        "width": 1040,
        "height": 450
      },
      "actions": [
        {
          "type": "uri",
          "area": {
            "x": 44,
            "y": 148,
            "width": 947,
            "height": 138
          },
          "linkUri": "http://queueonline.reh.go.th/index.html?userId=" + userId
        },
        {
          "type": "message",
          "area": {
            "x": 46,
            "y": 294,
            "width": 946,
            "height": 138
          },
          "text": "ตรวจสอบการลงทะเบียน"
        }
      ]
    }
    reply(userId, formatMessage)
    res.sendStatus(200)
  }
});

function reply(userId, formatMessage) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {Qg8Oxy7Paskgsph62kxIuKCI91vu/AIBada8UU7x/FY9oGK5ad8y3Xac0BeYZOdQFF3zG6rTTznGdABacEB1AZM4Hi7UaQ5riscja3LjH7NHN2EPh3eKvrNl3ANkyNVPMxAevnBvfvXIB4+KfoPkcwdB04t89/1O/w1cDnyilFU=}'
  }
  let body = JSON.stringify({
    to: userId,
    messages: [formatMessage]
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
