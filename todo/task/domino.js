const util = require('../lib/util.js');
const logger = require('../lib/log.js');
logger.info("fs...");
const fs = require("fs");

//const request = require('request');
//const charset = require('charset') //해당 사이트의 charset값을 알 수 있게 해준다.
//const iconv = require('iconv-lite') //인코딩을 변환 해주는 모듈, 필자는 iconv보다 iconv-lite를 선호한다.
//const { type } = require('os');

logger.info("completed import...");
//const xmlconvert = require('xml-js');
//var DOMParser = require("xmldom").DOMParser;
const maxLogin = 10;
var loginCount = 0;

function msgbox(param) {
    console.log(param);
}

var runAgent = function (config, qObj, dataObj) {
    var ret = false;
    logger.info("domino.js-runagent-CALL callNotesAgent..." + JSON.stringify(qObj));
    loginCount = 0;
    var tokenConfig = null;
    var serverCookie = "";
    var hasCookie = false;
    try {
        if (qObj.hasOwnProperty("cookie")) {
            hasCookie = true;
        }
    } catch (e) {

    }
    if (hasCookie) {
        serverCookie = qObj.cookie;
        console.log("Has Cookie Token=>" + serverCookie);
    } else {
        if (fs.existsSync(__dirname + '/token.json')) {
            try {
                var rawdata = fs.readFileSync(__dirname + '/token.json');
                tokenConfig = JSON.parse(rawdata);
                //토큰발행 후 timeout (분)이 지났으면 다시 로그인
                serverCookie = tokenConfig.sessiontoken;
                if (serverCookie) {
                    logger.error("이전에 로그인한 토큰이 존재합니다." + serverCookie);
                }

            } catch (e) {

            }

        } else {
            logger.error("이전에 로그인한 토큰이 없습니다.");
        }
    }

    if (typeof (serverCookie) == undefined || typeof (serverCookie) == "undefined" || serverCookie == null) {
        serverCookie = "";
    }
    console.log("call Notes Agent..." + serverCookie);
    callNotesAgent(config, qObj, serverCookie, dataObj);
    return ret;
}

function login(config, qObj, dataObj) {
    logger.info("http...");
    const http = require("http");
    logger.info("https...");
    const https = require("https");
    logger.info("request...");
    const req = require("request");

    
    var serverCookie = "";
    var tokenConfig = {};
    var requestUrl = "";
    var reqeuster = http;
    if (!config.domino.ssl) {
        requestUrl = "http://";
    } else {
        requestUrl = "https://"
        reqeuster = https;
    }
    requestUrl += config.domino.host;
    if (config.domino.httpport) {
        requestUrl += ":" + config.domino.httpport;
    }
    //requestUrl += "/names.nsf?login&username=" + config.domino.username + "&password=" + config.domino.password;

    var getUrl = requestUrl + "/names.nsf?login&username=" + config.domino.username + "&password=" + config.domino.password;
    var postUrl = requestUrl + "/names.nsf?login";
    var postData = "username=" + config.domino.username + "&password=" + config.domino.password;

    logger.info("Login to Domino Server..." + postUrl + " " + postData);
    if (config.domino.loginmethod && config.domino.loginmethod.toLowerCase() == "post") {
        req.post({
            url: postUrl,
            body: postData
        }, function (error, response, body) {
            if(error){
                console.log(error);
            }else{
                for (var index in response.headers["set-cookie"]) {
                    serverCookie = response.headers["set-cookie"][index];
                    if(serverCookie.toLowerCase().indexOf("DomAuthSessId".toLowerCase()) != -1 || serverCookie.toLowerCase().indexOf("ltpa".toLowerCase()) != -1){
                        if(serverCookie.indexOf(";") != -1){
                            serverCookie = util.strLeft(serverCookie, ";");
                        }
                        tokenConfig.sessiontoken = serverCookie;
                        var timestamp = new Date().getTime();
                        tokenConfig.created = timestamp;
                        break;
                    }                    
                }
    
                fs.writeFile(__dirname + '/token.json', JSON.stringify(tokenConfig), (err) => {
                    if (err) throw err;
                    console.log('Data written to file');
                });
                callNotesAgent(config, qObj, serverCookie, dataObj);
            }
            
        });
    } else {
        reqeuster.get(getUrl, (response) => {
            for (var index in response.headers["set-cookie"]) {
                serverCookie = response.headers["set-cookie"][index];
                if(serverCookie.toLowerCase().indexOf("DomAuthSessId".toLowerCase()) != -1 || serverCookie.toLowerCase().indexOf("ltpa".toLowerCase()) != -1){
                    if(serverCookie.indexOf(";") != -1){
                        serverCookie = util.strLeft(serverCookie, ";");
                    }
                    tokenConfig.sessiontoken = serverCookie;
                    var timestamp = new Date().getTime();
                    tokenConfig.created = timestamp;
                    break;
                }             }

            fs.writeFile(__dirname + '/token.json', JSON.stringify(tokenConfig), (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });
            callNotesAgent(config, qObj, serverCookie, dataObj);
        }).on('error', (e) => {
            console.error(e);
            util.writeError(JSON.stringify(e));
        });
    }

}

function __callNotesAgent(config, qObj, serverCookie, dataObj) {
    logger.info("http...");
    const http = require("http");
    logger.info("https...");
    const https = require("https");
    logger.info("request...");
    const req = require("request");

    var nsfPath = qObj.database;
    var unid = qObj.unid;
    var wsdl = "";
    if (!config.domino.ssl) {
        wsdl = "http://";
    } else {
        wsdl = "https://"
        //reqeuster = https;
    }
    wsdl += config.domino.host;
    if (config.domino.httpport) {
        wsdl += ":" + config.domino.httpport;
    }
    wsdl += config.domino.wsagent;

    console.log(wsdl + " using COOKIE " + serverCookie);
    var headers = { NSFPATH: nsfPath, UNID: unid, COOKIE: serverCookie};

    wsdl += "&soapaction=UPDATECUSTOMER" + "&nsfpath=" + nsfPath + "&unid=" + unid
    var postData = JSON.stringify(dataObj);
    req.post({
        url: wsdl,
        body: postData,
        headers:headers
    }, function (error, response, body) {
        try{
            var oBody = JSON.parse(body);
            console.log("###################################" + body);                
            if (oBody.err == 7001) {
                logger.info("domino.js-callNotesAgent-LOGIN...");
                loginCount++;
                if (loginCount > maxLogin) {
                    logger.error("로그인 시도횟수를 초과하였습니다.");
                } else {
                    login(config, qObj, dataObj);
                }
                return;
            } else {
                //서버 오류
            }
        }catch(e){

        }

        console.log(body);
        
    });
}

function callNotesAgent(config, qObj, serverCookie, dataObj) {
    logger.info("soap...");
    const soap = require('soap');
    var nsfPath = qObj.database;
    var unid = qObj.unid;
    var wsdl = "";
    if (!config.domino.ssl) {
        wsdl = "http://";
    } else {
        wsdl = "https://"
        //reqeuster = https;
    }
    wsdl += config.domino.host;
    if (config.domino.httpport) {
        wsdl += ":" + config.domino.httpport;
    }
    wsdl += config.domino.wsdl;
    console.log(wsdl + " using COOKIE " + serverCookie);
    var args = { NSFPATH: nsfPath, UNID: unid, OPENDART: dataObj };
    soap.createClient(wsdl, function (err, client) {
        //console.log(client)
        try {
            console.log("Add Header to SOAP Cookie..." + serverCookie);
            client.addHttpHeader('Cookie', serverCookie);
            client.UPDATECUSTOMER(args, function (err, result) {
                if (err) {
                    var fault = err.root.Envelope.Body.Fault;
                    var faultCode = fault.faultcode;
                    if (faultCode.indexOf(":") != 01) {
                        faultCode = util.strRight(faultCode, ":");
                    }
                    var faultString = fault.faultstring;
                    console.log("[" + faultCode + "]" + faultString);
                    if (faultCode == "7001") {
                        logger.info("domino.js-callNotesAgent-LOGIN...");
                        loginCount++;
                        if (loginCount > maxLogin) {
                            logger.error("로그인 시도횟수를 초과하였습니다.");
                        } else {
                            login(config, qObj, dataObj);
                        }
                        return;
                    } else {
                        //서버 오류
                    }
                } else {
                    console.log(result);
                }

            });
        } catch (e) {
            console.log(e);
        }

    });
}
function fileToBase64String(file) {

    //파일을 읽어서 내용을 base64로 변경
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
module.exports = { runAgent };