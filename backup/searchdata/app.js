const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const express = require("express");
const config = require("./config.json");
const util = require("./lib/util.js");
const dosearch = require("./task/search.js");
const languege = require("./task/langueges.js");
const log = console.log;

var pathList = [
  "/search",
  "/create",
  "/getlangueges",
  "/schema",
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

  console.log(reqUrl);

  var functionName = "";
  for (var index = 0; index < pathList.length; index++) {
    if (
      req.url
        .toLocaleLowerCase()
        .indexOf(pathList[index].toLocaleLowerCase()) == 0
    ) {
      var nIndex;
      var str = pathList[index];
      nIndex = str.indexOf("/");
      console.log("nIndex", nIndex);
      if (nIndex != -1) {
        functionName = str.substr(nIndex + 1, str.length);
        // eval(functionName)
        console.log(functionName + "hihi");
        qObj.cookie = req.headers.cookie;
        eval(functionName + '(config, qObj, res,req)');
      }
      break;
    }
  }
  
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
      var postData = body;
      // console.log(postData);
      qObj = JSON.parse(postData);
      console.log(util.getTimeStamp() + " " + "POST..." + req.url);

      console.log("찾았다");
      console.log(qObj);

      var reqUrl = url.parse(req.url, true);    
      console.log(reqUrl);
    
      var functionName = "";
      for (var index = 0; index < pathList.length; index++) {
        if (
          req.url
            .toLocaleLowerCase()
            .indexOf(pathList[index].toLocaleLowerCase()) == 0
        ) {
          var nIndex;
          var str = pathList[index];
          nIndex = str.indexOf("/");
          console.log("nIndex", nIndex);
          if (nIndex != -1) {
            functionName = str.substr(nIndex + 1, str.length);
            // eval(functionName)
            console.log(functionName + "hihi");
            console.log(req.headers.cookie,"coo");
            qObj.cookie = req.headers.cookie;
            eval(functionName + '(config, qObj, res,req)');
          }
          break;
        }
      }

    })

});

function search(config, qObj, res,req) {
  var query = qObj.searchword;
  console.log("검색어 : " + query);
  if (typeof query == "undefined" || typeof query == undefined || query == null || query == "") {
    console.log("검색어가 입력되지 않았습니다.");
    util.writeError("검색어가 입력되지 않았습니다", res);
    return;
  }

  if (typeof category == "undefined" || typeof category == undefined || category == null || category == "") {
    category = config.default_category;
    if (typeof category == "undefined" || typeof category == undefined || category == null || category == "") {
      qObj.category = "_all";
    }
  }

  console.log("요청한 페이지는 " + qObj.from);
  console.log("사이즈는 " + qObj.size);
  console.log("url--");
  console.log(req.url);

  dosearch.search(config, qObj, res,req)

}

function create(config, qObj, res,req) {
  var category = qObj.category;
  if (typeof category == "undefined" || typeof category == undefined || category == null || category == "") {
    category = config.default_category;
    if (typeof category == "undefined" || typeof category == undefined || category == null || category == "") {
      qObj.category = "_all";
    }
  }

  console.log("요청한 페이지는 " + qObj.page);
  console.log("사이즈는 " + qObj.size);

  dosearch.create(config, qObj, res,req);
}

function getlangueges(config, qObj, res,req) {
  console.log("getlangueges------");
  var locale =qObj.locale;
  if (typeof locale == "undefined" || typeof locale == undefined || locale == null) {
    console.log("locale가 입력하지 않았습니다.");
    util.writeError("locale가 입력하지 않았습니다.", res);
    return;
  }

  languege.getlangueges(config, qObj, res,req);

}

var server = app.listen(port, function () {
  console.log("Express server has started on port " + port);
})
