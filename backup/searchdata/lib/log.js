const util = require('./util.js');
var info = function(log_) {
    //DB에 저장
    console.log(util.getTimeStamp() + ": " + log_);
}
var error = function(log_){
    console.error(util.getTimeStamp() + ": " + log_);
}
var debug = function(log_){
    console.log(util.getTimeStamp() + ": " + log_);
}
//===========================[String control Function]===================//
module.exports = {info, error};