const express = require("express");
const config = require("./config/key.js");
const util = require("./lib/util.js");
const url = require("url");
const setting = require("./setting/index.js")

var pathList = [
  "/psearch",
  "/pupdate",
];

var app = express();

if (config.port) {
  port = config.port;
} else {
  console.log("환경 파일--config.json 에 port 키가 없습니다.");
}
app.get("/psearch", (req, res) => {
  console.log("여기안들어옴?");
  console.log(util.getTimeStamp() + " " + "GET..." + req.url);
  var reqUrl = url.parse(req.url, true);
  var qObj = reqUrl.query; // 일반적인 사용
  qObj.uid = '8';

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
      if (postData === undefined || postData.length === 0) {
        qObj = {};
      } else {
        qObj = JSON.parse(postData);

      }
      qObj.uid = '8';

      console.log(util.getTimeStamp() + " " + "POST..." + req.url);

      // qObj.cookie = req.headers.cookie;
      // console.log(req.headers.cookie, "cookie");
      console.log(req.headers, "req.headers");

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

            console.log(functionName, "functionname");
            eval(functionName + '(config, qObj, res,req)');
          }
          break;
        }
      }

    })

});

function psearch(config, qObj, res, req) {
  setting.psearch(config, qObj, res, req);
}
function pupdate(config, qObj, res, req) {
  setting.pupdate(config, qObj, res, req);
}

var server = app.listen(port, function () {
  console.log("Express server has started on port " + port);
})