const util = require("./util.js");
var info = function (para1, log_2, log_3, log_4, log_5) {
    //DB에 저장
    if (!(typeof log_5 == undefined || typeof log_5 == "undefined" ||log_5 == null)) {
        console.log(util.getTimeStamp(), para1, log_2, log_3, log_4, log_5);
    }else if (!(typeof log_4 == undefined || typeof log_4 == "undefined" ||log_4 == null)) {
        console.log(util.getTimeStamp(), para1, log_2, log_3, log_4);
    }else if (!(typeof log_3 == undefined || typeof log_3 == "undefined" ||log_3 == null)) {
        console.log(util.getTimeStamp(), para1, log_2, log_3);
    }else if (!(typeof log_2 == undefined || typeof log_2 == "undefined" ||log_2 == null)) {
        console.log(util.getTimeStamp(), para1, log_2);        
    }else{
        console.log(util.getTimeStamp() + ": " + para1);
    }
};
var log = function (para1, log_2, log_3, log_4, log_5) {
    info(para1, log_2, log_3, log_4, log_5);
};
var error = function (log_) {
    console.error(util.getTimeStamp() + ": " + log_);
};
var debug = function (log_) {
    console.log(util.getTimeStamp() + ": " + log_);
};
//===========================[String control Function]===================//
module.exports = { info, log, error };
