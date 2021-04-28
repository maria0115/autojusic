const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const express = require("express");
const config = require("./config.json");
const util = require("./lib/util.js");
const jdbc = require("./task/jdbcclass.js");
const log = console.log;

var pathList = [
  "/insert",
  "/select",
  "/remove",
  "/update",
  "/removeall",
  "/execute",
  "/all",
  "/createtable"

];
var app = express();

if (config.port) {
  port = config.port;
} else {
  console.log("환경 파일--config.json 에 port 키가 없습니다.");
}

app.get(pathList, (req, res) => {
  console.log(util.getTimeStamp() + " " + "GET..." + req.url);
  var reqUrl = url.parse(req.url, true);
  var qObj = reqUrl.query; // 일반적인 사용

  var functionName = "";
  for (var index = 0; index < pathList.length; index++) {
    if (
      req.url
        .toLocaleLowerCase()
        .indexOf(pathList[index].toLocaleLowerCase()) == 0
    ) {
      functionName = util.strRight(pathList[index], "/"); // ping./..
      break;
    }
  }
  if (functionName != "") {
    var shell = 'jdbc.' + functionName + '(config, qObj, res)';
    console.log(shell);
    eval(shell);
  }
  return;
});
app.post(pathList, (req, res) => {
  var body = [];
  var qObj = {};
  req
    .on("error", function (err) {
      console.log("[REQUEST_BODY-ERROR] " + err);
    })
    .on("data", function (chunk) {
      //chunk : postdata
      body.push(chunk);
    })
    .on("end", function (chunk) {
      console.log("=======================================");
      var postData = body.toString();
      console.log(postData);
      var arr = postData.split("&");
      // x=1&y=2&z=3 => [0] x=1 [1] y=2 [2] z=3
      for (var index = 0; index < arr.length; index++) {
        console.log(arr[index]);
        if (arr[index].indexOf("=") > 0) {
          var key = util.strLeft(arr[index], "=");
          var val = util.strRight(arr[index], "=");
          val = val.replace(/%20/gi, "&");
          qObj[key] = val;
        } else {
          var key = arr[index];
          qObj[key] = "";
        }
      }
      console.log(util.getTimeStamp() + " " + "POST..." + req.url);
      //var reqUrl = url.parse(req.url, true);
      //var qObj = req.body; // 일반적인 사용
      var functionName = "";
      for (var index = 0; index < pathList.length; index++) {
        if (
          req.url
            .toLocaleLowerCase()
            .indexOf(pathList[index].toLocaleLowerCase()) == 0
        ) {
          functionName = util.strRight(pathList[index], "/"); // ping./..
          break;
        }
      }
      if (functionName != "") {
        var shell = "jdbc." + functionName + "(config, qObj, res)";
        eval(shell);
      }
      return;
    });
});

var server = app.listen(port, function () {
  console.log("Express server has started on port " + port);
});
