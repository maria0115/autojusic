const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const express = require("express");
const config = require("./config/key.js");
const util = require("./lib/util.js");
const dosearch = require("./task/search.js");
const languege = require("./task/langueges.js");
const keyword = require("./task/search/searchkeyword.js");
const cookie = require('cookie');
const log = console.log;

var pathList = [
  "/search",
  "/getlanguages",
  "/schema",
  "/popular",
  "/auto"
  // "/all",
  // "/person",
  // "/approval",
  // "/board"
];
var app = express();

if (config.port) {
  port = config.port;
} else {
  console.log("환경 파일--config.json 에 port 키가 없습니다.");
}

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
      if (qObj === undefined) {
        qObj = {};
      }
      console.log(qObj, "qObj*******************************************")
      console.log(util.getTimeStamp() + " " + "POST..." + req.url);

      console.log("찾았다");
      qObj.cookie = req.headers.cookie;
      console.log(req.headers.cookie, "cookie");
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
            // eval(functionName)
            console.log(functionName + "hihi");
            if (functionName != "auto") {
              console.log('qObj.created:' + qObj.created);

              var moment = require('moment');//현재시간
              var utcTime = moment(qObj.created).format("YYYYMMDDHHmmss");//UTC시간
              var _1Hago = moment(qObj.created).subtract(1, 'h').format("YYYYMMDDHHmmss");//1시간전
              var _1Dago = moment(qObj.created).subtract(1, 'd').format("YYYYMMDDHHmmss");//1일전
              var _1Wago = moment(qObj.created).subtract(1, 'w').format("YYYYMMDDHHmmss");//1주전
              var _1Mago = moment(qObj.created).subtract(1, 'M').format("YYYYMMDDHHmmss");//1달전
              var _1Yago = moment(qObj.created).subtract(1, 'y').format("YYYYMMDDHHmmss");//1년전
              var startWeek = moment(qObj.current).startOf("week").utc().format("YYYYMMDDHHmmss");//이번주 첫날
              var startMonth = moment(qObj.current).startOf("month").utc().format("YYYYMMDDHHmmss");//이번달 첫날
              console.log('startMonth:', startMonth);
              qObj.klt = startWeek;
              qObj.klt = utcTime;
              if (qObj.gte == 'now-1h/s') {
                qObj.gte = _1Hago;
                qObj.lt = utcTime;
              }
              else if (qObj.gte == 'now-1d/d') {
                qObj.gte = _1Dago;
                qObj.lt = utcTime;
              }
              else if (qObj.gte == 'now-7d/d') {
                qObj.gte = _1Wago;
                qObj.lt = utcTime;
              }
              else if (qObj.gte == 'now-1M/d') {
                qObj.gte = _1Mago;
                qObj.lt = utcTime;
              }
              else if (qObj.gte == 'now-1y/d') {
                qObj.gte = _1Yago;
                qObj.lt = utcTime;
              }
              if (qObj.dateType == 'custom') {
                var startDate = qObj.gte;
                var endDate = qObj.lt;
                qObj.gte = moment(startDate, 'YYYYMMDDHHmmss').utc().format("YYYYMMDDHHmmss");
                qObj.lt = moment(endDate, 'YYYYMMDDHHmmss').utc().format("YYYYMMDDHHmmss");
              }
              if (qObj.term == 'thisWeek') {
                qObj.kgte = startWeek;
                qObj.klt = utcTime;
              } else if (qObj.term == 'thisMonth') {
                qObj.kgte = startMonth;
                qObj.klt = utcTime;
              }
            }
            console.log(functionName, "functionname");
            eval(functionName + '(config, qObj, res,req)');
          }
          break;
        }
      }

    })

});

function popular(config, qObj, res, req) {
  keyword.PopularSearch(config, qObj, res, req);
}

function UtcDate(utc) {
  var date = '';
  if (utc >= 0) {
    var utctime = new Date((utc));
    date = utctime.toFormat('-HH:MI');
  } else {
    var utctime = new Date((utc * -1));
    date = utctime.toFormat('+HH:MI');
  }
  console.log('date:', date);
  return date;
}

function search(config, qObj, res, req) {
  var query = qObj.searchword;
  console.log("검색어 : " + query);
  if (typeof query == "undefined" || typeof query == undefined || query == null || query == "") {
    // console.log("검색어가 입력되지 않았습니다.");
    // util.writeError("검색어가 입력되지 않았습니다", res);
    qObj.searchword = " ";
  }


  console.log("요청한 페이지는 " + qObj.from);
  console.log("사이즈는 " + qObj.size);
  console.log("url--");
  console.log(req.url);

  dosearch.search(config, qObj, res, req)

}

function getlanguages(config, qObj, res, req) {
  console.log("getlangueges------");
  var locale = qObj.locale;

  languege.getlanguages(config, qObj, res, req);

}

function auto(config, qObj, res, req) {
	console.log(qObj.searchword,"qObj.searchword");
  qObj.searchword = qObj.searchword.trim();
  if (typeof qObj.searchword == "undefined" ||
    typeof qObj.searchword == undefined ||
    qObj.searchword == null ||
    qObj.searchword == "") {
    
    var result = {
      Success:false,
      ErrMessage: "검색어가 입력되지 않았습니다"
    };
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json; charset=UTF-8");
    res.send(JSON.stringify(result));
	return
  }

  keyword.auto(config, qObj, res, req);
}

var server = app.listen(port, function () {
  console.log("Express server has started on port " + port);
})

// function create(config, qObj, res,req) {
//   var category = qObj.category;
//   if (typeof category == "undefined" || typeof category == undefined || category == null || category == "") {
//     category = config.default_category;
//     if (typeof category == "undefined" || typeof category == undefined || category == null || category == "") {
//       qObj.category = "_all";
//     }
//   }

//   console.log("요청한 페이지는 " + qObj.page);
//   console.log("사이즈는 " + qObj.size);

//   dosearch.create(config, qObj, res,req);
// }

// app.get(pathList, (req, res) => {
//   console.log(util.getTimeStamp() + " " + "GET..." + req.url);
//   var reqUrl = url.parse(req.url, true);
//   var qObj = reqUrl.query; // 일반적인 사용

//   console.log(reqUrl);

//   var functionName = "";
//   for (var index = 0; index < pathList.length; index++) {
//     if (
//       req.url
//         .toLocaleLowerCase()
//         .indexOf(pathList[index].toLocaleLowerCase()) == 0
//     ) {
//       var nIndex;
//       var str = pathList[index];
//       nIndex = str.indexOf("/");
//       console.log("nIndex", nIndex);
//       if (nIndex != -1) {
//         functionName = str.substr(nIndex + 1, str.length);
//         // eval(functionName)
//         console.log(functionName + "hihi");
//         qObj.cookie = req.headers.cookie;
//         eval(functionName + '(config, qObj, res,req)');
//       }
//       break;
//     }
//   }

// });

// function all(config, qObj, res, req){
//   console.log("all-----------------------------");
//   searchstart(config, qObj, res, req);
// }

// function person(config, qObj, res, req){
//   console.log("person--------------------------");
//   searchstart(config, qObj, res, req);
// }

// function approval(config, qObj, res, req){
//   console.log("approval------------------------");
//   searchstart(config, qObj, res, req);
// }

// function board(config, qObj, res, req){
//   console.log("board---------------------------");
//   searchstart(config, qObj, res, req);
// }

// function searchstart(config, qObj, res, req){
//   var query = qObj.searchword;
//   console.log("검색어 : " + query);
//   if (typeof query == "undefined" || typeof query == undefined || query == null || query == "") {
//     console.log("검색어가 입력되지 않았습니다.");
//     util.writeError("검색어가 입력되지 않았습니다", res);
//     return;
//   }

//   console.log("요청한 페이지는 " + qObj.from);
//   console.log("사이즈는 " + qObj.size);
//   console.log("url--");
//   console.log(req.url);

//   dosearch.search(config, qObj, res,req);
// }