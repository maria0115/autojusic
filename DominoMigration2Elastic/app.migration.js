const config = require("./config.json");
const util = require("./lib/util.js");
const logger = require("./lib/log.js");

const ftindex = require("./task/ftindexing.js");
const jsonfile = require("fs");

//jsonfile.unlink("./index.json", function (err) {
    //if (err) throw err;
    var args = [];
    var qObj = {};
    qObj.action = "create"; //bulk API 명령어 (추가만 한다.)
    ftindex.ftIndexing(qObj);
//});
