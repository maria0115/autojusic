const util = require("../lib/util.js");
const logger = require("../lib/log.js");
const config = require("../config.json");

const fs = require("fs");
const path = require("path");
const java = require("java");
const axios = require("axios");
const { htmlToText } = require("html-to-text");
const spawn = require("child_process").spawn; //
const execSync = require("child_process").execSync; //

console.log("import jar...");
java.classpath.push("./bin/Notes.jar");

/**
 * TriggerHappy에서 발생한 이벤트를 각 NSF의 에이전트에서 현재 WAS로 데이터를 전송하면, MEMDB 에 key:value로만 기록하고 있다가, 'realtimer'에 의해 특정 시간에 모아서 처리함
 * @param {*} reqData
 */
const ftIndexing = async (reqData) => {
    console.log(
        "====================================[START ftIndexing]========================="
    );

    var debugging = config.notes.debugging;
    var masterDocs = require("../working/masterdocs.json");
    //cloneData : var key = qObj.repid + "." + qObj.unid + "." + qObj.eventid;

    var notedIdObjects = [];
    for (var key in reqData) {
        var arr = key.split(".");
        var repid = arr[0]; // <- masterdocs의 키
        var unid = arr[1];
        var eventid = arr[2];

        //Domino에서 보내은 데이터를 하나씩 분리
        logger.log("masterDocs.repid", repid);
        var targtDbInfoObject = masterDocs[repid]; //NSF REPLICA ID에 해당하는 환경설정 문서
        var cloneData = JSON.parse(JSON.stringify(targtDbInfoObject));

        var newObj = {};
        newObj[key] = cloneData;
        newObj[key].repid = repid;
        newObj[key].unid = unid;
        newObj[key].eventid = eventid;

        //벌크처리용 배열생성
        notedIdObjects.push(newObj); //지금 처리할 문서를 배열에 추가
    }
    //using DIIOP
    if (notedIdObjects != null && notedIdObjects.length > 0) {
        //E.S로 벌크업로드 후 차례로 업데이트 (DIIOP 처리 전)
        //delete & index command
        indexElasticDocuments(notedIdObjects);

        //기본 데이터는 생성했으니, 남은 데이터는 업데이트만 실시
        main(notedIdObjects);
    }
};

const indexElasticDocuments = async (notedIdObjects) => {
    var ret = false;
    //try {
    var bulk = {};
    var indexObj = {};
    var bulkList = "";

    var elasticsearchDatabase = config.search.elasticsearchDatabase;
    var typeName = config.search.elasticsearchTypeName;
    var url = config.search.elasticsearchHost + "/";

    var elasticsearchId = config.search.elasticsearchId;
    var elasticsearchPassword = config.search.elasticsearchPassword;

    for (var index = 0; index < notedIdObjects.length; index++) {
        var notedIdObject = notedIdObjects[index];
        for (var key in notedIdObject) {
            var replicaId = util.strLeft(key, ".");
            var masterDoc = notedIdObject[key]; //SERVER!!DBPATH
            var eventId = masterDoc.eventid;
            if (eventId == "8") {
                //for 엘라스틱서치의 데이터 삭제
                var unid = masterDoc.unid;
                indexObj["_index"] = elasticsearchDatabase;
                if (typeName != "") {
                    indexObj["_type"] = typeName; //엘라스틱 V7.0 미만의 서버에서는 Type을 구분해야함.
                }
                indexObj["_id"] = unid;
                bulk["delete"] = indexObj; //action : create, update
                bulkList += JSON.stringify(bulk) + "\n";
            } else {
                //for 엘라스틱서치의 데이터 추가 또는 업데이트
                var unid = masterDoc.unid;
                indexObj["_index"] = elasticsearchDatabase;
                if (typeName != "") {
                    indexObj["_type"] = typeName; //엘라스틱 V7.0 미만의 서버에서는 Type을 구분해야함.
                }
                indexObj["_id"] = unid;

                //console.log(indexObj);
                bulk["index"] = indexObj; //action : create, update
                bulkList += JSON.stringify(bulk) + "\n";

                var esData = {};
                esData["@unid"] = unid;
                bulkList += JSON.stringify(esData) + "\n";
            }
        }
    }

    logger.info(
        "[" +
            replicaId +
            "]" +
            "BULK Data Submit to ELASTICSEARCH SERVER-------------------> " +
            unid +
            " for BASE DATA...",
        bulkList
    );
    bulkUpdate(
        bulkList,
        url,
        elasticsearchId,
        elasticsearchPassword,
        "realtime"
    );

    ret = true;
    //} catch (e) {
    //    logger.error(e);
    //}
    return ret;
};

const main = async (notedIdObjects) => {
    //DIIOP로 Domino 접속
    console.log("NotesFactory.createSession...");
    java.callStaticMethod(
        "lotus.domino.NotesFactory",
        "createSession",
        config.domino.server,
        config.domino.username,
        config.domino.password,
        function (err, ss) {
            if (err) {
                console.log(err);
                //java.callStaticMethod("lotus.domino.NotesFactory", "stermThread");
                return;
            }
            console.log("Connection Notes SUCCESS!");
            updateSearchTargetDocuments4Realtime(notedIdObjects, ss);

            console.log("NotesFactory.createSession.END");
            //java.callStaticMethod("lotus.domino.NotesThread", "stermThread");
        }
    );
};

const updateSearchTargetDocuments4Realtime = async (notedIdObjects, ss) => {
    try {
        var dominoServer = config.search.masterServer;
        var searchMasterPath = config.search.masterDatabase;

        //처리요청한 배열을 하나씩 분리하여 삭제또는 업데이트 요청 (to ElasticSearch)
        //console.log(notedIdObjects);
        //console.log("-----------");
        for (var index = 0; index < notedIdObjects.length; index++) {
            var notedIdObject = notedIdObjects[index];
            for (var key in notedIdObject) {
                var replicaId = util.strLeft(key, ".");
                var masterDoc = notedIdObject[key]; //SERVER!!DBPATH
                //console.log(masterDoc);
                var eventId = masterDoc.eventid;
                if (eventId == "8") {
                    //for 엘라스틱서치의 데이터 삭제
                } else {
                    console.log("update for document..." + masterDoc.unid);
                    if (getFieldValue(masterDoc, "isuse") == "1") {
                        //사용
                        //msgbox(getFieldValue(masterDoc, "docid") + ":" + getFieldValue(masterDoc, "app_path") + " Working....=>Target");
                        //엘라스틱서치 데이터 업데이트(index:있으면 삭제하고 생성, 없으면 추가)
                        updateDatabaseDocuments(
                            ss,
                            masterDoc,
                            replicaId,
                            "realtime"
                        );
                    }
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
};

const updateDatabaseDocuments = async (ss, masterDoc, replicaId, action) => {
    console.log(
        "-----------------updateDatabaseDocuments----------------->" + replicaId
    );
    var dbdir = null;
    var db = null;
    var view = null;
    var nav = null;
    var ent = null;
    var doc = null;
    try {
        var bulkSize = 0;
        var cnt = 0;
        var total = 0;
        try {
            var bs = config.search.elasticsearchBulkSize;
            bulkSize = bs * 1;
        } catch (e) {
            bulkSize = 500;
        }
        if (bulkSize <= 0) {
            bulkSize = 1000;
        }

        var useAttachmentsText = config.search.useAttachmentsText;

        var elasticsearchDatabase = config.search.elasticsearchDatabase;
        var typeName = config.search.elasticsearchTypeName;
        var url = config.search.elasticsearchHost + "/"; // + elasticsearchDatabase;

        var elasticsearchId = config.search.elasticsearchId;
        var elasticsearchPassword = config.search.elasticsearchPassword;

        var dominoServer = config.search.masterServer;
        if (getFieldValue(masterDoc, "app_server") != "") {
            dominoServer = getFieldValue(masterDoc, "app_server");
        }
        var searchViewName = config.domino.searchViewName;
        //db = ss.getDatabaseSync(dominoServer, replicaId);
        //db = ss.getDatabaseSync(null, null);

        //console.log(dominoServer)
        //dbdir = ss.getDbDirectorySync(dominoServer);
        //db = dbdir.openDatabaseByReplicaID(replicaId);
        //console.log(db.getFilePathSync())
        //db.openByReplicaIDSync(dominoServer, replicaId);

        db = ss.getDatabaseSync(dominoServer, masterDoc["databasepath"]);
        console.log(db.getFilePathSync());

        //for mail database (private db)
        var baseReaders = null;
        if (getFieldValue(masterDoc, "privateDB") == "1") {
            //msgbox("for Private Database (ex Mail)..." + db.getFilePathSync());
            var nm = null;
            var acl = db.getACLSync();
            var tmpent = null;
            var entry = acl.getFirstEntrySync();
            while (entry != null) {
                tmpent = acl.getNextEntrySync();

                nm = ss.createNameSync(entry.getNameSync());
                if (nm.getCommonSync() == nm.getAbbreviatedSync()) {
                    //for group
                } else {
                    //form person or server
                    if (entry.getLevelSync() > 3) {
                        //for Editor
                        if (baseReaders == null) {
                            baseReaders = [];
                        }
                        baseReaders.push(nm.getCanonicalSync());
                    }
                }

                entry.recycleSync();
                entry = tmpent;
            }
            try {
                if (nm != null) nm.recycle(function (err, res) {});
                if (entry != null) entry.recycle(function (err, res) {});
                if (tmpent != null) tmpent.recycle(function (err, res) {});
                if (acl != null) acl.recycle(function (err, res) {});
            } catch (e) {}
        }
        logger.info("Database ACL", baseReaders);
        //key : dominio view column name, value: elasticsearch field name
        var fieldMap = config.domino.searchColumnNames2Fields;
        var category = getFieldValue(masterDoc, "categorycode");
        console.log(category);

        //String timeZone = (String)((JSONObject)config.get("search")).get("timeZone"); // +09:00

        if (!db.isOpenSync()) {
        } else {
            console.log(
                "Database is opened!!!" +
                    db.getFilePathSync() +
                    ", Open View..." +
                    searchViewName
            );
            view = db.getViewSync(searchViewName);
            console.log(
                "-------------------------------$SearchView is opened!"
            );
            view.setAutoUpdateSync(false);
            //view.createViewNav(function (err, nav) {
            var columnMap = {};
            var columnFormula = {};
            var columns = view.getColumnsSync();
            for (var index = 0; index < columns.sizeSync(); index++) {
                var column = columns.getSync(index);
                var columnName = column.getItemNameSync().toLowerCase();
                columnMap[index + ""] = columnName;

                var sFormula = column.getFormulaSync();
                var columnText = "";
                if (sFormula != "") {
                    sFormula = sFormula.replace(/\r\n/g, " ");
                    sFormula = sFormula.replace(/\n\r/g, " ");
                    sFormula = sFormula.replace(/\n/g, " ");
                    sFormula = sFormula.replace(/\r/g, " ");
                } else {
                    sFormula = column.getItemNameSync();
                }
                columnFormula[index + ""] = sFormula; // ["0"] = $modified, ["1"]=$subject, ....
            }
            //console.log(columnFormula);
            var bulkList = "";
            var docCount = 0;
            var unid = masterDoc.unid;
            doc = db.getDocumentByUNIDSync(unid);
            var CRLF = "";
            var viewFormula = view.getSelectionFormulaSync();
            if (viewFormula.indexOf("\r\n") != -1) {
                CRLF = "\r\n";
            } else if (viewFormula.indexOf("\n\r") != -1) {
                CRLF = "\n\r";
            } else if (viewFormula.indexOf("\n") != -1) {
                CRLF = "\n";
            } else if (viewFormula.indexOf("\r") != -1) {
                CRLF = "\r";
            }
            if (CRLF == "") CRLF = "\n";

            var arrTmp = viewFormula.split(CRLF);
            for (var x = 0; x < arrTmp.length; x++) {
                if (arrTmp[x].trim().toLowerCase().indexOf("select ") == 0) {
                    viewFormula = arrTmp[x].substring(
                        arrTmp[x].toLowerCase().indexOf("select ") + 7
                    );
                    break;
                }
            }

            if (!viewFormula == "") {
                viewFormula = "@If(" + viewFormula + '; "1"; "0")';

                var comp = ss.evaluateSync(viewFormula, doc);
                if (comp.getSync(0) == "0") {
                    if (doc != null) doc.recycleSync();
                    doc = null;
                }
            }
            var docLastMofied = null;
            while (ent != null || doc != null) {
                var valuesAll = []; //Vector valuesAll = null;
                for (var key in columnFormula) {
                    //String key = keys.next(); //"0", "1", ...
                    var formula = columnFormula[key];
                    try {
                        var columnVal = ss.evaluateSync(formula, doc);
                        if (columnVal.sizeSync() == 1) {
                            valuesAll.push(columnVal.getSync(0));
                        } else {
                            valuesAll.push(columnVal);
                        }
                    } catch (e) {}
                }

                docLastMofied = doc.getLastModifiedSync();
                //엘라스틱서치에 전송할 데이터 생성
                cnt++;
                total++;
                var bulk = {};
                var index = {};
                docCount++;

                var msg =
                    "[" +
                    replicaId +
                    "]" +
                    total +
                    "...Add to Bulk..." +
                    db.getFilePathSync() +
                    "!!" +
                    doc.getUniversalIDSync() +
                    "=>" +
                    docLastMofied;
                logger.info(msg);

                var esData = {};
                esData["@server"] = db.getServerSync();
                var tmp = db.getFilePathSync();
                //console.log(tmp.replace(/\\/gi, '/'))
                esData["@filepath"] = tmp.replace(/\\/gi, "/");

                tmp = getLastModified(doc.getCreatedSync());
                esData["@created"] = tmp;

                esData["@lastmodified"] = getLastModified(
                    doc.getLastModifiedSync()
                );
                esData["@entryid"] = docCount + "-" + doc.getUniversalIDSync();
                esData["@unid"] = doc.getUniversalIDSync();
                esData["@noteid"] = doc.getNoteIDSync();
                esData["@position"] = docCount + "";
                esData["@siblings"] = view.getTopLevelEntryCountSync() + "";
                esData["$form"] = doc.getItemValueString("form");
                var fielsVal = getSpecialFieldsValue(doc); //독서자와 본문 HTML을 TEXT만 추출하여 object에 담음
                try {
                    var readers_ = fielsVal["readers"];
                    if (getFieldValue(masterDoc, "privateDB") == "1") {
                        if (readers_[0] == "*" && baseReaders != null) {
                            esData["$readers"] = baseReaders; //DB ACL ===> Doc Readers
                        } else {
                            esData["$readers"] = fielsVal["readers"]; //문서내 독서자 원본값
                        }
                    } else {
                        //pulic database
                        esData["$readers"] = fielsVal["readers"]; //문서내 독서자 원본값
                    }
                } catch (e) {}

                //for BODY = RUCHTEXT
                try {
                    esData["body"] = fielsVal["body"]; //문서내 태그를 제거하거 32K내로 정리한 본문
                } catch (e) {
                    //e.printStackTrace();
                }

                try {
                    esData["category"] = category;
                } catch (e) {}
                /*
                        try {
                            if (useAttachmentsText) {
                                var fileFilterText = getFileFilteredFileText(
                                    config,
                                    replicaId,
                                    doc
                                );
                                esData["attachtext"] = fileFilterText;
                            }
                        } catch (e) {}
                        */
                //Iterator<String> keys = columnMap.keySet().iterator();
                for (var key in columnMap) {
                    //String key = keys.next(); //"0", "1", ...
                    var dominoColumnName = columnMap[key];
                    var columnIndex = key * 1; //0,1,2...N

                    var esFieldName = null;
                    /**
						 *      "searchColumnNames2Fields": {
						 *      "보기 컬럼명": "엘라스틱서치 필드명",
					            "$dept": "dept",
					            "$subject": "subject",
					            "$author": "author",
					            "$created": "created",
					            "$nav": "nav",
					            "$photo": "photo",
					            "$attached": "attached",
					            "$url": "url",
					            "$category": "category"
					        }
						 */
                    try {
                        esFieldName = fieldMap[dominoColumnName]; //
                    } catch (e) {
                        esFieldName = null;
                    }
                    if (esFieldName == null || esFieldName == "") {
                    } else {
                        //벡터의 크기가 1이면 Single 값
                        //int columnIndex = Integer.parseInt(key);
                        //System.out.println("ent..." + ent.isDocument());
                        var valueTypeName = typeof valuesAll[columnIndex]; //java.lang.String, java.util.Vector,...

                        if (
                            valueTypeName.toLowerCase().indexOf("object") != -1
                        ) {
                            var jarr = [];
                            var values = valuesAll[columnIndex];
                            var valueText = "";
                            for (var j = 0; j < values.sizeSync(); j++) {
                                //if(!valueText.equals("")) {
                                //	valueText += "";
                                //}
                                //valueText += (String)values.elementAt(j);
                                jarr.push(values.getSync(j));
                            }
                            esData[esFieldName] = jarr;
                        } else {
                            if (esFieldName.toLowerCase() == "created") {
                                try {
                                    var createdTypeName = typeof valuesAll[
                                        columnIndex
                                    ]; //java.lang.String, java.util.Vector,...
                                    //console.log(createdTypeName);
                                    var dCT = null;
                                    if (
                                        createdTypeName.toLowerCase() ==
                                        "string"
                                    ) {
                                        var value = valuesAll[columnIndex]; //yyyy-MM-dd HH:mm:ss
                                        dCT = doc
                                            .getParentDatabaseSync()
                                            .getParentSync()
                                            .createDateTimeSync(value);
                                    } else {
                                        dCT = valuesAll[columnIndex];
                                    }
                                    utcTime = getGMTTime(dCT);

                                    console.log(
                                        "$CREATED CONVERTED: " +
                                            " ====> " +
                                            utcTime
                                    );

                                    esData[esFieldName] = utcTime;
                                } catch (e) {
                                    console.log(e);
                                    var utcTime = valuesAll[columnIndex];
                                    console.log("error time:" + utcTime);
                                    utcTime = utcTime.replace(/-/g, "");
                                    utcTime = utcTime.replace(/ /g, "T");
                                    utcTime = utcTime.replace(/:/g, "");

                                    try {
                                    } catch (e1) {
                                        esData[esFieldName] = utcTime;
                                    }
                                }
                            } else {
                                esData[esFieldName] = valuesAll[columnIndex];
                            }
                        }
                    }
                }

                //totalCount++;
                //PP: E.S로 전송
                console.log(url);
                //URL : ~~~/
                documentUpdate(
                    esData,
                    url,
                    elasticsearchId,
                    elasticsearchPassword,
                    "updatefields"
                );

                //첨부파일 text 색인
                try {
                    var useAttachmentsText = config.search.useAttachmentsText;
                    if (useAttachmentsText) {
                        updateFileFilteredFileText(config, replicaId, doc);
                    }
                } catch (e) {}
                //============================================================================//
                if (ent != null) {
                    ent.recycle();
                    ent = tmp;
                }
                if (doc != null) {
                    doc.recycle();
                    doc = null;
                }
            }
            //});
        }
    } catch (e) {
        console.log(e);
    } finally {
        if (doc != null) {
            doc.recycle(function (err, res) {});
        }
        if (ent != null) {
            ent.recycle(function (err, res) {});
        }
        if (nav != null) {
            nav.recycle(function (err, res) {});
        }
        if (view != null) {
            view.recycle(function (err, res) {});
        }
        if (db != null) {
            db.recycle(function (err, res) {});
        }
        if (dbdir != null) {
            dbdir.recycle(function (err, res) {});
        }
    }
};

/**
 * 문서내의 Body필드 TEXT값과 독서자필드의 값 추출
 * @param {대상 문서} doc
 */
function getSpecialFieldsValue(doc) {
    var ret = {};
    var hasReaders = false;
    //StringBuffer readers = null;
    var readers = [];
    var rt = "";
    var Item = java.import("lotus.domino.Item");
    try {
        var hasStar = false; //ADD-2020.10.08
        var items = doc.getItemsSync();
        for (var index = 0; index < items.sizeSync(); index++) {
            var item = items.getSync(index);
            var fieldType = item.getTypeSync();
            if (item.getValueStringSync().toLowerCase() == "$file") {
                //for @Attachments
                //첨부파일인 경우
            } else {
                if (
                    fieldType == Item.ACTIONCD ||
                    fieldType == Item.ASSISTANTINFO ||
                    fieldType == Item.ATTACHMENT ||
                    fieldType == Item.COLLATION ||
                    fieldType == Item.EMBEDDEDOBJECT ||
                    fieldType == Item.FORMULA ||
                    fieldType == Item.ERRORITEM ||
                    fieldType == Item.HTML ||
                    fieldType == Item.ICON ||
                    fieldType == Item.LSOBJECT ||
                    fieldType == Item.MIME_PART ||
                    fieldType == Item.NOTELINKS ||
                    fieldType == Item.NOTEREFS ||
                    fieldType == Item.OTHEROBJECT ||
                    fieldType == Item.QUERYCD ||
                    fieldType == Item.RFC822TEXT ||
                    fieldType == Item.SIGNATURE ||
                    fieldType == Item.UNAVAILABLE ||
                    fieldType == Item.UNKNOWN ||
                    fieldType == Item.USERDATA ||
                    fieldType == Item.USERID ||
                    fieldType == Item.VIEWMAPDATA ||
                    fieldType == Item.VIEWMAPLAYOUT
                ) {
                    continue;
                }

                if (fieldType == Item.RICHTEXT) {
                    var bodyText = item.getTextSync();
                    if (bodyText.indexOf("\n\r") != -1) {
                        bodyText = bodyText.replace(/\n\r/g, "");
                    }
                    if (bodyText.indexOf("\r\n") != -1) {
                        bodyText = bodyText.replace(/\r\n/g, "");
                    }
                    if (bodyText.indexOf("\r") != -1) {
                        bodyText = bodyText.replace(/\r/g, "");
                    }
                    if (bodyText.indexOf("\n") != -1) {
                        bodyText = bodyText.replace(/\n/g, "");
                    }
                    if (bodyText.indexOf("\t") != -1) {
                        bodyText = bodyText.replace(/\t/g, "");
                    }
                    //bodyText = bodyText.replaceAll("  ", "");
                    //pamsgbox(bodyText);
                    rt += bodyText;
                }
                if (fieldType == Item.READERS || fieldType == Item.AUTHORS) {
                    //System.out.println("READERS/AUTHORS=>" + item.getName());
                    var v = item.getValuesSync();
                    if (v != null) {
                        for (var idx = 0; idx < v.sizeSync(); idx++) {
                            var s = v.getSync(idx);
                            if (s == "") {
                            } else {
                                //ADD-2020.10.08 START
                                if (fieldType == Item.READERS && s == "*") {
                                    hasStar = true;
                                    break;
                                }
                                //ADD-2020.10.08 END
                                if (fieldType == Item.READERS) {
                                    //System.out.println("READERS=>" + item.getName());
                                    hasReaders = true;
                                } else {
                                    //System.out.println("AUTHORS=>" + item.getName());
                                }
                                readers.push(s);
                            }
                        }
                    }
                }
            }
        }
        //ADD-2020.10.08 START
        if (hasStar) {
            //모든 사용자에게 권한이 있음
            var value = [];
            value.push("*");
            ret["readers"] = value;
        } else {
            if (hasReaders) {
                //문서에 독서자 필드가 존재함
                //ret = readers.toString();
                ret["readers"] = readers;
            } else {
                //모든 사용자에게 권한이 있음
                var value = [];
                value.push("*");
                ret["readers"] = value;
            }
        }
        try {
            var bodyStr = getSummary(rt, 32766);
            //if(bodyStr.length() > 32000) {
            //	bodyStr = bodyStr.substring(0, 32000);
            //}
            ret["body"] = bodyStr;
        } catch (e) {
            ret["body"] = e.message;
        }

        //attachments TEXT (attachtext)

        //ADD-2020.10.08 END
    } catch (e) {
        console.log(e);
    }
    return ret;
}

function getSummary(html, maxLength) {
    var ret = "";
    try {
        //option은 https://www.npmjs.com/package/html-to-text 확인
        ret = htmlToText(html, {
            wordwrap: 130,
        });
        if (maxLength > 0 && ret.length() > maxLength) {
            ret = ret.substring(0, maxLength - 1);
        }
    } catch (e) {
        // TODO: handle exception
        //e.printStackTrace();
    }
    return ret;
}

const updateFileFilteredFileText = async (config, replicaId, doc) => {
    var ret = "";
    //Session ss = null;
    console.log("updateFileFilteredFileText", "Start...");
    var obj = null;
    var fileTexts = "";

    var inDirPath = "";

    var sepa = "/";
    var dataDirectory = config.notes.jarPath;
    if (dataDirectory.indexOf("/") == -1) {
        sepa = "\\";
    }

    inDirPath = util.strLeftBack(dataDirectory, sepa);
    inDirPath += sepa + "attachmentnames";
    inDirPath += sepa + doc.getUniversalIDSync();
    if (fs.existsSync(inDirPath)) {
        fs.mkdirSync(inDirPath, { recursive: true });
    }

    console.log("updateFileFilteredFileText", "inDirPath...", inDirPath);
    try {
        //file download

        //ex snf_exe -U8 in out
        //var args = [];
        //args.push("-U8");

        var timeout = 0;
        var strTimeout = config.search.attachmentsTextEngineTimeout;
        try {
            timeout = strTimeout * 1;
        } catch (e) {}
        if (timeout == 0) {
            timeout = 10000;
        }
        //ss = doc.getParentDatabase().getParent();
        var files = doc
            .getParentDatabaseSync()
            .getParentSync()
            .evaluateSync("@AttachmentNames( 1 )", doc); //MIME 파일은 제외

        var hasAttachments = false;
        if (files.sizeSync() == 1) {
            var fileName = files.getSync(0);
            if (fileName == "") {
                hasAttachments = false;
            } else {
                hasAttachments = true;
            }
        } else if (files.sizeSync() > 1) {
            hasAttachments = true;
        }

        if (hasAttachments) {
            var fileFilterText = "";
            var deletesFilePaths = [];
            for (var index = 0; index < files.sizeSync(); index++) {
                var inFilePath = "";
                var outFilePath = "";

                var fileName = files.getSync(index);
                if (fileName == "") {
                    continue;
                }

                if (!fs.existsSync(inDirPath)) {
                    fs.mkdirSync(inDirPath, { recursive: true });
                }
                var r = Math.random() * 1000000;
                inFilePath =
                    inDirPath +
                    sepa +
                    r +
                    "." +
                    util.strRightBack(fileName, ".");

                if (obj != null) {
                    obj.recycleSync();
                }
                try {
                    obj = doc.getAttachmentSync(fileName);
                    obj.extractFileSync(inFilePath);
                } catch (e) {}

                if (!fs.existsSync(inDirPath)) {
                    continue;
                }
                //args.push(inFilePath);

                outFilePath = inFilePath + ".filtered";
                //args.push(outFilePath);

                /////////////////////
                //var length = args.length;
                //System.out.println(" - Arguement length: " + length);

                //var sb = "";
                var processor = config.search.attachmentsTextEnginePath; //D:/nodejs/app/DominoMigration2Elastic/bin/filefiltersynap/filter4-v4.24.0-windows_64bit_VC12/v4/snf_exe.exex1
                console.log(
                    "Get TEXT From Attachments for '" + fileName + "'..."
                );

                var options = ["-U8", inFilePath, outFilePath];
                var cmd = processor + " " + options.join(" ");
                execSync(cmd); //, options);
                var data = fs.readFileSync(outFilePath, "utf8");
                //console.log("ddddddddddddd" + data);
                fileFilterText += data;

                deletesFilePaths.push(inFilePath);
                deletesFilePaths.push(outFilePath);
            }
            var esData = {};
            esData["attachtext"] = fileFilterText;

            var url = config.search.elasticsearchHost + "/"; // + elasticsearchDatabase;
            var elasticsearchId = config.search.elasticsearchId;
            var elasticsearchPassword = config.search.elasticsearchPassword;
            documentUpdate(
                esData,
                url,
                elasticsearchId,
                elasticsearchPassword,
                "updateattach"
            );
            deleteFolderRecursive(inDirPath);
        }
    } catch (e) {
        //e.printStackTrace();
        console.log(e);
    } finally {
        //deleteFolderRecursive(inDirPath);
        if (obj != null) {
            obj.recycle(function (err, res) {});
        }
    }
    //return fileTexts;
};

function Uint8ArrToString(myUint8Arr) {
    return String.fromCharCode.apply(null, myUint8Arr);
}
var deleteFolderRecursive = function (path) {
    // existsSync: 파일이나 폴더가 존재하는 파악
    if (fs.existsSync(path)) {
        // readdirSync(path): 디렉토리 안의 파일의 이름을 배열로 반환
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;

            if (fs.lstatSync(curPath).isDirectory()) {
                // lstatSync: stat값을 반환함, isDirectory(): 디렉토리인지 파악
                deleteFolderRecursive(curPath); // 재귀(reCurse)
            } else {
                // delete file
                fs.unlinkSync(curPath); // unlinkSync: 파일 삭제
            }
        });

        fs.rmdirSync(path); // rmdirSync: 폴더 삭제
    }
};

function getFieldValue(masterDoc, fieldName) {
    var ret = "";
    try {
        var key = fieldName.toLowerCase();
        ret = masterDoc[key];
    } catch (e) {
        ret = "";
    }
    return ret;
}

function documentUpdate(esData, typeUrl, strUser, strPasswd, action) {
    var ret = true;
    var debugToFile = false;
    try {
        var headers = {};
        try {
            debugToFile = config.realtime.writeSendLogFile; //환경파일에서 파일로 기록을 남길것인지 여부 추출
        } catch (e) {}
        var bulkApiURL = "";
        //V7: POST <인덱스>/_update/<도큐먼트 id>
        bulkApiURL = typeUrl + "_update/" + esData["@unid"]; // 엘라스틱 REST API 주소 생성 V7

        //V6 : POST <인덱스>/<도큐먼트 타입>/<도큐먼트 id>/_update
        if (config.search.elasticsearchVersion) {
            var typeName = config.search.elasticsearchTypeName;
            bulkApiURL = typeUrl; //protocol + host + port + "/"
            if (typeName != "") {
                bulkApiURL += typeName + "/"; //ex) http://127.0.0.1:19200/_doc
            }
            bulkApiURL += esData["@unid"] + "/_update";
        }
        var strEncodingAuth = "";
        if (strUser != "") {
            var strAuth = strUser + ":" + strPasswd;
            strEncodingAuth = "Basic " + base64encode(strAuth); //엘라스틱서치 REST API는 id/pw를 base64로 인코딩한 값의 헤더('Authorization')로 호출자를 인증함
            //oHttpURLConnection.setRequestProperty("Authorization", "Basic " + strEncodingAuth);
            headers["Authorization"] = strEncodingAuth;
        }
        var method = "POST";
        var postData = {};
        postData["doc"] = esData;

        var taskName = getYyyyMmDdMmSsToString();
        if (debugToFile) {
            //요청 기록
            var logDir = path.join(__dirname, "..", "log/" + getYmd());
            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
            }
            var logFilePath =
                logDir + "/" + action + "." + taskName + "_req.json";
            logger.info("write file...", logFilePath);
            fs.writeFile(
                logFilePath,
                JSON.stringify(postData),
                "utf8",
                function (error) {
                    console.log("Request log file write end");
                }
            );
        }

        logger.info(
            "DOCUMENT UPDATE ADDRESS=" +
                bulkApiURL +
                ", METHOD=" +
                method +
                ", HEADER=" +
                JSON.stringify(headers)
        );
        axios(
            {
                url: bulkApiURL,
                method: method.toUpperCase(),
                headers: headers,
                data: JSON.stringify(postData),
            },
            function (error, response) {
                var dateFileName = util.getTimeStampNoSepa();
                if (error) {
                    console.log(response);
                    if (debugToFile) {
                        var logDir = path.join(
                            __dirname,
                            "..",
                            "log/" + getYmd()
                        );
                        if (!fs.existsSync(logDir)) {
                            fs.mkdirSync(logDir, { recursive: true });
                        }
                        var logFilePath =
                            logDir +
                            "/" +
                            action +
                            "." +
                            taskName +
                            "_error.json";

                        logger.info("write file...", logFilePath);
                        fs.writeFile(
                            logFilePath,
                            response.data,
                            "utf8",
                            function (error) {
                                console.log("Request log file write end");
                            }
                        );
                    }

                    return;
                }
                if (debugToFile) {
                    var logDir = path.join(__dirname, "..", "log/" + getYmd());
                    if (!fs.existsSync(logDir)) {
                        fs.mkdirSync(logDir, { recursive: true });
                    }
                    var logFilePath =
                        logDir + "/" + action + "." + taskName + "_res.json";

                    logger.info("write file...", logFilePath);
                    fs.writeFile(
                        logFilePath,
                        response.data,
                        "utf8",
                        function (error) {
                            console.log("Request log file write end");
                        }
                    );
                }
                var bulkRes = JSON.parse(response.data);
                if (bulkRes.errors) {
                    //"errors": false | true
                    var logDir = path.join(__dirname, "..", "log/" + getYmd());
                    if (!fs.existsSync(logDir)) {
                        fs.mkdirSync(logDir, { recursive: true });
                    }
                    var logFilePath =
                        logDir +
                        "/" +
                        action +
                        "." +
                        taskName +
                        "_res.err.json";

                    logger.info("write file...", logFilePath);
                    fs.writeFile(
                        logFilePath,
                        response.data,
                        "utf8",
                        function (error) {
                            console.log("Request log file write end");
                        }
                    );
                }
                //결과가 error이면 무조건 기록을 남긴다
                //response
                //retstr.put("result", true);
                //retstr.put("responseCode", response.status);
                //retstr.put("responseText", response.data);
            }
        );
    } catch (e) {
        console.log(e);
    }
    return ret;
}

function bulkUpdate(bulkList, typeUrl, strUser, strPasswd, action) {
    var ret = true;
    var debugToFile = false;
    try {
        var headers = {};
        try {
            debugToFile = config.realtime.writeSendLogFile; //환경파일에서 파일로 기록을 남길것인지 여부 추출
        } catch (e) {}
        var bulkApiURL = typeUrl + "_bulk"; // 엘라스틱 REST API 주소 생성
        var strEncodingAuth = "";
        if (strUser != "") {
            var strAuth = strUser + ":" + strPasswd;
            strEncodingAuth = "Basic " + base64encode(strAuth); //엘라스틱서치 REST API는 id/pw를 base64로 인코딩한 값의 헤더('Authorization')로 호출자를 인증함
            //oHttpURLConnection.setRequestProperty("Authorization", "Basic " + strEncodingAuth);
            headers["Authorization"] = strEncodingAuth;
        }
        var method = "PUT";

        var taskName = getYyyyMmDdMmSsToString();
        if (debugToFile) {
            //요청 기록
            var logDir = path.join(__dirname, "..", "log/" + getYmd());
            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
            }
            var logFilePath =
                logDir + "/" + action + "." + taskName + "_req.json";

            logger.info("write file...", logFilePath);
            fs.writeFile(logFilePath, bulkList, "utf8", function (error) {
                console.log("Request log file write end");
            });
        }
        logger.info(
            "BULK UPLOADER ADDRESS=" +
                bulkApiURL +
                ", METHOD=" +
                method +
                ", HEADER=" +
                JSON.stringify(headers)
        );
        axios(
            {
                url: bulkApiURL,
                method: method.toUpperCase(),
                headers: headers,
                data: bulkList,
            },
            function (error, response) {
                var dateFileName = util.getTimeStampNoSepa();
                if (error) {
                    console.log(response);
                    if (debugToFile) {
                        var logDir = path.join(
                            __dirname,
                            "..",
                            "log/" + getYmd()
                        );
                        if (!fs.existsSync(logDir)) {
                            fs.mkdirSync(logDir, { recursive: true });
                        }
                        var logFilePath =
                            logDir +
                            "/" +
                            action +
                            "." +
                            taskName +
                            "_error.json";

                        logger.info("write file...", logFilePath);
                        fs.writeFile(
                            logFilePath,
                            response.data,
                            "utf8",
                            function (error) {
                                console.log("Request log file write end");
                            }
                        );
                    }

                    return;
                }
                if (debugToFile) {
                    var logDir = path.join(__dirname, "..", "log/" + getYmd());
                    if (!fs.existsSync(logDir)) {
                        fs.mkdirSync(logDir, { recursive: true });
                    }
                    var logFilePath =
                        logDir + "/" + action + "." + taskName + "_res.json";

                    logger.info("write file...", logFilePath);
                    fs.writeFile(
                        logFilePath,
                        response.data,
                        "utf8",
                        function (error) {
                            console.log("Request log file write end");
                        }
                    );
                }
                var bulkRes = JSON.parse(response.data);
                if (bulkRes.errors) {
                    //"errors": false | true
                    var logDir = path.join(__dirname, "..", "log/" + getYmd());
                    if (!fs.existsSync(logDir)) {
                        fs.mkdirSync(logDir, { recursive: true });
                    }
                    var logFilePath =
                        logDir +
                        "/" +
                        action +
                        "." +
                        taskName +
                        "_res.error.json";

                    logger.info("write file...", logFilePath);
                    fs.writeFile(
                        logFilePath,
                        response.data,
                        "utf8",
                        function (error) {
                            console.log("Request log file write end");
                        }
                    );
                }
                //결과가 error이면 무조건 기록을 남긴다
                //response
                //retstr.put("result", true);
                //retstr.put("responseCode", response.status);
                //retstr.put("responseText", response.data);
            }
        );
    } catch (e) {
        console.log(e);
    }
    return ret;
}

function base64encode(plaintext) {
    return Buffer.from(plaintext, "utf8").toString("base64");
}

function base64decode(base64text) {
    return Buffer.from(base64text, "base64").toString("utf8");
}

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

function getDateStrForElasticDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }

    yyyy = yyyy.toString();
    mm = mm.toString();
    dd = dd.toString();

    var h = date.getHours();
    var m = date.getHours();
    var s = date.getMinutes();
    var ss = date.getMilliseconds();

    //if(m<10){m='0'+m} if(s<10){s='0'+s}  if(ss<10){ss='0'+ss} if(ss<100){ss='00'+ss}
    h = h.toString();
    m = leadingZeros(m, 2);
    s = leadingZeros(s, 2);
    ss = leadingZeros(ss, 3);

    var s1 = yyyy + mm + dd + "T" + h + m + s;
    return s1;
}

function getGMTTime(date) {
    var ret = "";
    console.log(
        "getGMTTime:",
        "args",
        date.getLocalTimeSync() + "==>" + date.getGMTTimeSync()
    );
    var parseDate = date.toJavaDateSync();
    var tz = java.callStaticMethodSync("java.util.TimeZone", "getDefault");
    var sdf = java.newInstanceSync(
        "java.text.SimpleDateFormat",
        "yyyyMMdd'T'HHmmss"
    );
    var milliseconds = parseDate.getTimeSync();
    var offset = tz.getOffsetSync(milliseconds);
    var utcTime = sdf.formatSync(milliseconds - offset);
    ret = utcTime.replace("+0000", "");
    console.log("getGMTTime:", "ret", ret);
    return ret;
}
function getLastModified(date) {
    var ret = "";
    console.log(
        "getLastModified",
        "start...",
        date.getLocalTimeSync() + "==>" + date.getGMTTimeSync()
    );
    var parseDate = date.toJavaDateSync();
    var sdf = java.newInstanceSync(
        "java.text.SimpleDateFormat",
        "yyyy-MM-dd HH:mm:ss.SSS"
    );
    ret = sdf.formatSync(parseDate);
    console.log("getLastModified", "return...", ret);
    return ret;
}

function getYyyyMmDdMmSsToString() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }

    yyyy = yyyy.toString();
    mm = mm.toString();
    dd = dd.toString();

    var h = date.getHours();
    var m = date.getHours();
    var s = date.getMinutes();
    var ss = date.getMilliseconds();

    //if(m<10){m='0'+m} if(s<10){s='0'+s}  if(ss<10){ss='0'+ss} if(ss<100){ss='00'+ss}
    h = h.toString();
    m = leadingZeros(m, 2);
    s = leadingZeros(s, 2);
    ss = leadingZeros(ss, 3);

    var s1 = yyyy + mm + dd + h + m + s + ss;
    return s1;
}

function getYmd() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }

    yyyy = yyyy.toString();
    mm = mm.toString();
    dd = dd.toString();

    var s1 = yyyy + mm + dd;
    return s1;
}

var leadingZeros = function (n, digits) {
    var zero = "";
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
};

module.exports = { ftIndexing };
