const express = require("express");
const fs = require("fs");
const sharp = require('sharp');
const bodyParser = require("body-parser");
const axios = require('axios');
const moment = require('moment');
moment.locale('th');
const restService = express("");
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

restService.post("/webhook", function (req, res) {
  let userId = req.body.originalDetectIntentRequest.payload.data.source.userId;
  reply(userId)
  res.json({
    fulfillmentText:  userId,
    source: "line"
  });
});
function reply(userId) {
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {KZFW6ZW36NTo2nWriM/bqpf4B2YmOsKkx0Ijd1Zl6n3oOBo//A2TErMT5oBAv5nKV0/xTLdDVC4vXDzfaufdeXStbBPgDNe4Of9WE/49lPkh00j0LDSEQZmauPnWQL4QAQOkKLIpYUmAfgV0BQSJYgdB04t89/1O/w1cDnyilFU=}'
  }
  let body = JSON.stringify({
      to: userId,
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
