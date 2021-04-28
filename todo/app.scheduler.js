const config = require('./config.json');
const util = require('./lib/util.js');
const logger = require('./lib/log.js');

var schedule = require('node-schedule');
/*
* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ |
│ │ │ │ │ └ 주중반복시기 (0 - 7) (0 or 7 일요일)
│ │ │ │ └───── 달 (1 - 12)
│ │ │ └────────── 일 (1 - 31)
│ │ └─────────────── 시 (0 - 23)
│ └──────────────────── 분 (0 - 59)
└───────────────────────── 초 (0 - 59, OPTIONAL)
*/

// */X <= 'X'가 분
console.log(util.getTimeStamp() + ": start for " + config.shcedule.test5);
var test5 = schedule.scheduleJob(config.shcedule.test5, function(){    
    //function () {....}  
    logger.info("schedule...:" + config.shcedule.test5);
    //console.log(util.getTimeStamp() + ": interval");
});

console.log(util.getTimeStamp() + ": start for " + config.shcedule.cu);
var cu = schedule.scheduleJob(config.shcedule.cu, function(){    
    //function () {....}  
    logger.info("schedule...:" + config.shcedule.cu);
    //console.log(util.getTimeStamp() + ": interval");
});
