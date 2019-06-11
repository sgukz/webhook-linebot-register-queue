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
  const toTwoDigits = num => (num < 10 ? "0" + num : num);
  let today = new Date();
  let year = today.getFullYear();
  let year_TH = parseInt(today.getFullYear()) + 543;
  let month = toTwoDigits(today.getMonth() + 1);
  let day = toTwoDigits(today.getDate());
  let ToDay = moment().format('LL');
  let date_now = `${year}-${month}-${day}`;

  return res.json({
    data: JSON.stringify(req.body)
  });

});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
