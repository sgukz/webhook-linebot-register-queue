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
  res.json({
    fulfillmentText:  userId,
    source: "line"
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
