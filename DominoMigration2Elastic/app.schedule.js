const config = require("./config.json");
const util = require("./lib/util.js");
const logger = require("./lib/log.js");
var schedule = require('node-schedule');
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
const ftindex = require("./task/ftindexing.js");

//var args = [];
var qObj = {};
qObj.action = "index";
ftindex.ftIndexing(qObj);

var timer = config.scheduler.interval;
const j = schedule.scheduleJob("*/" + timer + " * * * *", function () {
    console.log( config.scheduler.interval + "분 마다 실행");
    var qObj = {};
    qObj.action = "index";
    ftindex.ftIndexing(qObj);
});