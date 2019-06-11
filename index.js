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
    for(var i = 1; i <= 10; i++){
      let formatMessage = {
        type: "text",
        text: i
      }
      reply(userId, formatMessage)
    }
    // let formatMessage = {
    //   "type": "flex",
    //   "altText": "ยืนยันลงทะเบียนเพื่อรับข้อมูลข่าวสารจากโรงพยาบาลร้อยเอ็ด",
    //   "contents": {
    //     "type": "bubble",
    //     "styles": {
    //       "header": {
    //         "backgroundColor": "#16a9ff"
    //       }
    //     },
    //     "header": {
    //       "type": "box",
    //       "layout": "vertical",
    //       "contents": [
    //         {
    //           "type": "text",
    //           "text": "ลงทะเบียน",
    //           "size": "md",
    //           "weight": "bold",
    //           "color": "#FFFFFF"
    //         }
    //       ]
    //     },
    //     "hero": {
    //       "type": "image",
    //       "url": "https://show-image.herokuapp.com/img/logo_reh.png",
    //       "size": "md",
    //       "aspectMode": "cover"
    //     },
    //     "body": {
    //       "type": "box",
    //       "layout": "vertical",
    //       "contents": [
    //         {
    //           "type": "text",
    //           "text": "ลงทะเบียนเพื่อรับข้อมูลข่าวสาร",
    //           "align": "center"
    //         },
    //         {
    //           "type": "button",
    //           "style": "link",
    //           "action": {
    //             "type": "uri",
    //             "label": "ยืนยันลงทะเบียน",
    //             "uri": "http://queueonline.reh.go.th/index.html?userId=" + userId
    //           }
    //         }
    //       ]
    //     }
    //   }

    // }
    // reply(userId, formatMessage)
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
