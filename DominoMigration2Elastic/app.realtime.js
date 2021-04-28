const config = require("./config.json");
const util = require("./lib/util.js");
const logger = require("./lib/log.js");
const schedule = require("node-schedule");

/*
* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ |
│ │ │ │ │ └ 주중반복시기 (0 - 7) (0 or 7 일요일)
│ │ │ │ └───── 달 (1 - 12)
│ │ │ └────────── 일 (1 - 31)
│ │ └─────────────── 시 (0 - 23)
│ └──────────────────── 분 (0 - 59)/N => N분에 한번씩 수행
└───────────────────────── 초 (0 - 59, 생략가능)
*/
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const express = require("express");
const path = require("path");

//var requester = require("./request.json");
const ftindex = require("./task/rtindexing.js");
var MEMDB = require("./memory.db.json");
var pathList = ["/ftindexing"];
var app = express();

//var args = [];

if (config.port) {
    port = config.port;
} else {
    console.log("환경 파일--config.json 에 port 키가 없습니다.");
}

const realtimer = async () => {
    //X초마다 (거의 실시간) ./requests/realtime.json을 이름을 바꾸어서 처리하고 삭제한다.
    var timer = config.realtime.interval;
    const j = schedule.scheduleJob("*/" + timer + " * * * * *", function () {
        logger.info("TIMER: Data=>", MEMDB);
        var cloneData = JSON.parse(JSON.stringify(MEMDB)); //메모리에 있는 요청 jsoN을 복사
        MEMDB = {}; //메모리 데이터 클리어
        ftindex.ftIndexing(cloneData);
    });
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

app.post(pathList, (req, res) => {
    var body = [];
    var qObj = {};
    req.on("error", function (err) {
        console.log("[REQUEST_BODY-ERROR] " + err);
    })
        .on("data", function (chunk) {
            //chunk : postdata
            body.push(chunk);
        })
        .on("end", function (chunk) {
            console.log("=======================================POST");
            var postData = body.toString();
            console.log(postData);
            var isParseError = false;
            try {
                qObj = JSON.parse(postData);
            } catch (e) {
                isParseError = true;
            }
            if (isParseError) {
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
            }

            console.log(util.getTimeStamp() + " " + "POST..." + req.url);
            console.log("qObj", qObj);
            //var reqUrl = url.parse(req.url, true);
            //var qObj = req.body; // 일반적인 사용
            callTask(req, res, qObj);
            return;
        });
});

app.get(pathList, (req, res) => {
    console.log(util.getTimeStamp() + " " + "GET..." + req.url);
    var reqUrl = url.parse(req.url, true);
    var qObj = reqUrl.query; // 일반적인 사용

    console.log(util.getTimeStamp() + " " + "GET..." + req.url);
    console.log("qObj", qObj);

    callTask(req, res, qObj);
    return;
});

const callTask = async (req, res, qObj) => {
    //console.log("REQUEST DATA:", qObj);
    var functionName = "";
    var foundService = false;
    for (var index = 0; index < pathList.length; index++) {
        if (
            req.url
                .toLocaleLowerCase()
                .indexOf(pathList[index].toLocaleLowerCase()) == 0
        ) {
            //functionName = util.strRight(pathList[index], "/"); // ping./.. 'statichtml', 'dynamichtml',
            foundService = true;
            break;
        } else {
            util.writeSuccess(
                { err: true, error: "Not found service name!" },
                res
            );
        }
    }
    if (!foundService) {
        util.writeSuccess({ err: true, error: "Not found service name!" }, res);
        return;
    }
    util.writeSuccess({ success: true }, res);

    //실시간 색인 요청(from domino)의 내용을 파일로 저장
    var key = qObj.repid + "." + qObj.unid + "." + qObj["eventid"];
    MEMDB[key] = qObj; //ex:
};

var server = app.listen(port, function () {
    console.log("Express server has started on port " + port);
});

realtimer();
