const util = require("../lib/util.js");
const logger = require("../lib/log.js");

const path = require("path");
const spawn = require("child_process").spawn; //
const fs = require("fs");

const ftIndexing = async (qObj, res) => {
    console.log(
        "====================================[START ftIndexing]========================="
    );
    const config = require("../config.json");
    var debugging = config.notes.debugging;
    var sepa = getPathSeparator();

    //먼저 검색설정 마스터 문서 UNID를 추출한다.
    //var configJsonFilePath = __dirname + sepa + "config.json";
    var configJsonFilePath = path.join(__dirname, "..", "config.json"); //'..' 는 상위 폴더
    logger.info("ftIndexing", "환경설정파일 경로", configJsonFilePath);
    var options = [
        "-jar",
        config.notes.jarPath,
        configJsonFilePath,
        "GetMasterDocInfo",
    ];
    if (qObj.action == "realtime") {
        //실시간 처리인 경우, 처리할 내용이 'requestFilePath' 에 부분적으로 존재함
        doRealtimeProcess(qObj.requestFilePath, qObj);
        return;
    }
    const spawnOptions = {
        cwd: __dirname,
        windowsHide: true,
    };
    logger.info(config.notes.notesJvmPath + "/bin/java", options);
    var child = spawn(config.notes.notesJvmPath + "/bin/java", options);
    child.stdout.on("data", function (data) {
        var textData = Uint8ArrToString(data);
        logger.info("getMasterDocInfo", "수신된 Java Data...", textData);
    });

    // Receive error output of the child process
    child.stderr.on("data", function (err) {
        var textData = Uint8ArrToString(err);
        logger.info("getMasterDocInfo", "Java data 수신 에러...", textData);
    });

    // Triggered when the process closes
    child.on("close", function (code) {
        //for 마이그레이션 또는 증분색인
        var masterDocs = {}; //require("../masterdocs.json"); // {masterdoc.unid:masterdoc.unid}
        var jsonFilePath = path.join(
            __dirname,
            "..",
            "working/masterdocs.json"
        ); //'..' 는 상위 폴더
        console.log(jsonFilePath);
        var data = fs.readFileSync(jsonFilePath, "utf8");
        //console.log(data);
        masterDocs = JSON.parse(data);

        //var masterDocs = cloneJson(origMasterDocs);

        //logger.info("masterdocs.json", masterDocs);
        var thread = config.scheduler.thread;
        var pos = 0;
        var threadObj = {};

        console.log("TREAD Init...", threadObj);
        //( Math.random() * ( 최대값 - 최소값 )  ) + 최소값
        if (thread == 1) {
            //단일 쓰레드로 처리하는 경우
            threadObj[1] = [];
            for (var repid in masterDocs) {
                var repObj = {};
                repObj[repid] = masterDocs[repid];
                threadObj[1].push(repObj);
            }
        } else {
            for (var tr = 1; tr <= thread; tr++) {
                threadObj[tr] = [];

                //var repIndex = 0;
                for (var repid in masterDocs) {
                    var repObj = {};
                    repObj[repid] = masterDocs[repid];
                    threadObj[tr].push(repObj);
                    delete masterDocs[repid]; // Removes json.foo from the dictionary.
                    break;
                }
            }
            while (true) {
                var maxDoc = 0;
                for (var key in masterDocs) {
                    maxDoc++;
                }
                //while 전에 각 스레드에 1개씩 할당하고 나서 남은게 있는지 체크
                var found = false;
                for (var key in masterDocs) {
                    found = true;
                    break;
                }
                if (!found) break;
                //console.log("maxDoc...", maxDoc);
                var trPos = getRandomIntInclusive(1, thread);
                //console.log("trPos...", trPos);
                var docPos = getRandomIntInclusive(1, maxDoc);
                //console.log("docPos...", docPos);

                var docPosCount = 0;
                var picKey = "";
                for (var key in masterDocs) {
                    docPosCount++;
                    if (docPosCount == docPos) {
                        picKey = key;
                        break;
                    }
                }

                var repObj = {};
                repObj[picKey] = masterDocs[picKey];
                threadObj[trPos].push(repObj); // threadObj[1] = 'C4EBD023081DE1C44925866B0041C085', ...
                //console.log("RANDOM threadObj...", threadObj);

                delete masterDocs[picKey]; // Removes json.foo from the dictionary.

                //console.log("POST DELETE...", masterDocs);
                found = false;
                for (var key in masterDocs) {
                    found = true;
                    break;
                }
                if (!found) break;
            }
        }

        for (var x in threadObj) {
            var workingthreadJsonFilePath = path.join(
                __dirname,
                "..",
                "working/workingthread_" + x + " .json"
            ); //'..' 는 상위 폴더
            logger.info("write file...", workingthreadJsonFilePath);
            fs.writeFileSync(
                workingthreadJsonFilePath,
                JSON.stringify(threadObj[x]),
                "utf8"
            );
            logger.info("Call Function", "Async doMigration...");
            doMigration(workingthreadJsonFilePath, qObj);
        }
    });
};

function cloneJson(obj) {
    if (obj === null || typeof obj !== "object") return obj;

    var copy = obj.constructor();

    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
        }
    }

    return copy;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}
const doRealtimeProcess = async (workingthreadJsonFilePath, qObj, res) => {
    logger.info("doRealtimeProcess", workingthreadJsonFilePath); // = {"DB-REP-ID.UNID":{"DB-REP-ID":"", "UNID":"ddd"}}
    const config = require("../config.json");
    var debugging = config.notes.debugging;
    var sepa = getPathSeparator();

    var jsonFilePath = path.join(__dirname, "..", "working/masterdocs.json"); //'..' 는 상위 폴더
    logger.info("Reading master file...", jsonFilePath);
    var data2 = fs.readFileSync(jsonFilePath, "utf8");
    var masterDocs = JSON.parse(data2);

    logger.info("Reading realtime file...", workingthreadJsonFilePath);
    var data = fs.readFileSync(workingthreadJsonFilePath, "utf8");
    var threadDoc = JSON.parse(data);
    console.log(threadDoc);

    var threadsDoc = [];
    for (var key in threadDoc) {
        logger.info("Realtime Object Key", key);
        //var key = qObj.repid + "." + qObj.unid + "." + qObj["event-id"];
        var arr = key.split("."); //[0]; rep-ikd, [1]=unid, [2]=event-id;
        var repObj = {};
        var repid = arr[0];
        repObj[key] = masterDocs[repid];
        for (var subKey in threadDoc[key]) {
            //logger.info("sub", subKey, threadDoc[key]);
            repObj[key][subKey] = threadDoc[key][subKey];
        }
        threadsDoc.push(repObj);
    }

    fs.unlinkSync(workingthreadJsonFilePath);
    fs.writeFileSync(
        workingthreadJsonFilePath,
        JSON.stringify(threadsDoc),
        "utf8"
    );
    //return;
    //먼저 검색설정 마스터 문서 UNID를 추출한다.
    //var configJsonFilePath = __dirname + sepa + "config.json";
    var configJsonFilePath = path.join(__dirname, "..", "config.json"); //'..' 는 상위 폴더
    logger.info("ftIndexing", "환경설정파일 경로", configJsonFilePath);
    var options = [
        "-jar",
        config.notes.jarPath,
        configJsonFilePath,
        "doRealtimeProcess",
        workingthreadJsonFilePath,
        qObj.action,
    ];
    const spawnOptions = {
        cwd: __dirname,
        stdio: "ignore",
        detached: true,
        shell: true,
        windowsHide: true,
    };
    var child = spawn(config.notes.notesJvmPath + "/bin/java", options);
    child.stdout.on("data", function (data) {
        var textData = Uint8ArrToString(data);
        logger.info(textData);
    });

    // Receive error output of the child process
    child.stderr.on("data", function (err) {
        var textData = Uint8ArrToString(err);
        logger.info("ftIndexing", "Java data 수신 에러...", textData);
    });

    // Triggered when the process closes
    child.on("close", function (code) {
        //logger.info("ftIndexing", "Java 수신 종료:", code);
        fs.unlink(workingthreadJsonFilePath, function (err) {
            logger.info("DELETED realtime request file.");
        });
    });
};

const doMigration = async (workingthreadJsonFilePath, qObj, res) => {
    logger.info("doMigration", workingthreadJsonFilePath);
    const config = require("../config.json");
    var debugging = config.notes.debugging;
    var sepa = getPathSeparator();

    //먼저 검색설정 마스터 문서 UNID를 추출한다.
    //var configJsonFilePath = __dirname + sepa + "config.json";
    var configJsonFilePath = path.join(__dirname, "..", "config.json"); //'..' 는 상위 폴더
    logger.info("ftIndexing", "환경설정파일 경로", configJsonFilePath);

    var schedulerStatus = config.scheduler.status;
    if (
        typeof schedulerStatus == undefined ||
        typeof schedulerStatus == "undefined" ||
        schedulerStatus == null
    ) {
        schedulerStatus = 1;
    }
    if (schedulerStatus == 1) {
        var options = [
            "-jar",
            config.notes.jarPath,
            configJsonFilePath,
            "doMigration",
            workingthreadJsonFilePath,
            qObj.action,
        ];
        const spawnOptions = {
            cwd: __dirname,
            stdio: "ignore",
            detached: true,
            shell: true,
            windowsHide: true,
        };
        var child = spawn(
            config.notes.notesJvmPath + "/bin/java",
            options
        );
        child.stdout.on("data", function (data) {
            var textData = Uint8ArrToString(data);
            logger.info(textData);
        });

        // Receive error output of the child process
        child.stderr.on("data", function (err) {
            var textData = Uint8ArrToString(err);
            logger.info("ftIndexing", "Java data 수신 에러...", textData);
        });

        // Triggered when the process closes
        child.on("close", function (code) {
            //logger.info("ftIndexing", "Java 수신 종료:", code);
        });
    }
};

function Uint8ArrToString(myUint8Arr) {
    return String.fromCharCode.apply(null, myUint8Arr);
}

function getPathSeparator() {
    var myGlobals = { isWin: false, isOsX: false, isNix: false };
    if (/^win/.test(process.platform)) {
        myGlobals.isWin = true;
    } else if (process.platform === "darwin") {
        myGlobals.isOsX = true;
    } else if (process.platform === "linux") {
        myGlobals.isNix = true;
    }
    if (myGlobals.isWin) {
        return "\\";
    } else if (myGlobals.isOsx || myGlobals.isNix) {
        return "/";
    }

    // default to *nix system.
    return "/";
}

module.exports = { ftIndexing };
