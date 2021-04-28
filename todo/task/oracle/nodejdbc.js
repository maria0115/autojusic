console.log("inport module...oracledb");
const util = require("../../lib/util.js");
const logger = require("../../lib/log.js");
var oracledb = require("oracledb");
/*
    Con.server = "125.7.235.24"			'## 서버명
    Con.Port = 1521
    Con.Database = "sha"
    Con.Userid = "sha"				'## 사용자 ID
    Con.Password = "sha"			'## 사용자 Password
    Con.Connect						'## 오라클에 연결
    
    tmpStr = "jdbc:oracle:thin:@" + Me.mServer
    If mPort > 0 Then
        tmpStr = tmpStr+ ":" + Cstr(mPort)
    End If
    If Me.mDatabase <> "" Then
        tmpStr = tmpStr+ ":" + Me.mDatabase
    End If
    select BUSEO_CD from P_INSA where EMP_CD=209003
*/
console.log("set config...");
var xconfig = {
    user: "sha",
    password: "sha",
    connectString: "125.7.235.24:1521/sha",
};

function getConnectionConfig(config, qObj) {
    var connectString = "";
    try {
        connectString = qObj["connectionstring"];
    } catch (e) {
        connectString = "";
    }
    if (typeof connectString == "undefined" || typeof connectString == undefined || connectString == null) {
        connectString = "";
    }

    console.log("getConnectionConfig...connectString=>", connectString);
    //console.log(util.strRight(connectString, "@"));
    var server = "";
    var sids = "";
    var port = "";
    var sid = "";

    console.log("connectString", connectString);
    if (connectString != "") {

        server = util.strLeft(util.strRight(connectString, "@"), ":");
        sids = util.strRight(util.strRight(connectString, "@"), ":");
        port = "";
        sid = "";
        if (sids.indexOf(":") != -1) {
            //ex 1521:SID
            port = ":" + util.strLeft(sids, ":");
            sid = util.strRight(sids, ":");
        } else {
            //ex SID
            port = "";
            sid = sids;
        }
        var connectionConfig = {};
        connectionConfig.user = qObj["userid"];
        connectionConfig.password = qObj["password"];
        connectionConfig.connectString = server + port + "/" + sid;
    } else {
        server = config.dbms.server;
        port = config.dbms.port;
        sid = config.dbms.database;
        var connectionConfig = {};
        connectionConfig.user = config.dbms.user;
        connectionConfig.password = config.dbms.password;
        connectionConfig.connectString = server + ":" + port + "/" + sid;
    }

    return connectionConfig;
}

async function connect(config, qObj, res) {
    var connectionConfig = getConnectionConfig(config, qObj);
    console.log("Connect To Oracle...for CONNECTION=>");
    console.log(connectionConfig);
    oracledb.getConnection(connectionConfig, (err, conn) => {
        if (err) {
            console.log(err);
            util.writeError(err.message, res);
        } else {
            util.writeSuccess({ result: true }, res);
        }
        doRelease(conn);
    });
}

async function insert(config, qObj, res) {
    var connectionConfig = getConnectionConfig(config, qObj);
    console.log("Connect To Oracle...for INSERT=>");
    console.log(connectionConfig);
    oracledb.autoCommit = true;
    oracledb.getConnection(connectionConfig, (err, conn) => {
        if (err) {
            console.log(err);
            util.writeError(err.message, res);
            doRelease(conn);
            return;
        }
        // var query = qObj["query"]; //INSERT INTO...
        var query = "insert into todo_maria(id,text,checked) values(" + qObj.id + ",'" + qObj.text + "',-1)"
        //var result = await conn.execute(query);
        conn.execute(query, [], function (err, result) {
            if (err) {
                console.log(err);
                util.writeError(err.message, res);
                doRelease(conn);
                return;
            }
            util.writeSuccess({ updated: result.rowsAffected + "" }, res);
            doRelease(conn);
            return;
        });
    });
}

async function update(config, qObj, res) {
    var connectionConfig = getConnectionConfig(config, qObj);
    console.log("Connect To Oracle...for UPDATE=>");
    console.log(connectionConfig);
    oracledb.autoCommit = true;
    oracledb.getConnection(connectionConfig, (err, conn) => {
        if (err) {
            console.log(err);
            util.writeError(err.message, res);
            doRelease(conn);
            return;
        }
        // var query = qObj["query"]; //INSERT INTO...
        var query = "update todo_maria set text = '" + qObj.text + "' where id = " + qObj.id;
        //var result = await conn.execute(query);
        conn.execute(query, [], function (err, result) {
            if (err) {
                console.log(err);
                util.writeError(err.message, res);
                doRelease(conn);
                return;
            }
            util.writeSuccess({ updated: result.rowsAffected + "" }, res);
            doRelease(conn);
            return;
        });
    });
}

async function remove(config, qObj, res) {
    var connectionConfig = getConnectionConfig(config, qObj);
    console.log("Connect To Oracle...for remove=>");
    console.log(connectionConfig);
    oracledb.autoCommit = true;
    oracledb.getConnection(connectionConfig, (err, conn) => {
        if (err) {
            console.log(err);
            util.writeError(err.message, res);
            doRelease(conn);
            return;
        }
        // var query = qObj["query"]; //INSERT INTO...
        console.log(qObj["id"])
        var query = `delete from todo_maria where id = ${qObj["id"]}`;
        // var query = "drop table todo_maria";
        //var result = await conn.execute(query);
        conn.execute(query, [], function (err, result) {
            if (err) {
                console.log(err);
                util.writeError(err.message, res);
                doRelease(conn);
                return;
            }
            util.writeSuccess({ updated: result.rowsAffected + "" }, res);
            doRelease(conn);
            return;
        });
    });
}
async function all(config, qObj, res) {
    var connectionConfig = getConnectionConfig(config, qObj);
    console.log("Connect To Oracle...for all=>");
    console.log(connectionConfig);
    oracledb.autoCommit = true;
    oracledb.getConnection(connectionConfig, (err, conn) => {
        if (err) {
            console.log(err);
            util.writeError(err.message, res);
            doRelease(conn);
            return;
        }
        // var query = qObj["query"]; //INSERT INTO...
        // var query = "delete from todo_maria where id = " + qObj.id;
        var query = "drop table todo_maria";
        //var result = await conn.execute(query);
        conn.execute(query, [], function (err, result) {
            if (err) {
                console.log(err);
                util.writeError(err.message, res);
                doRelease(conn);
                return;
            }
            util.writeSuccess({ updated: result.rowsAffected + "" }, res);
            doRelease(conn);
            return;
        });
    });
}

async function createtable(config, qObj, res) {
    var connectionConfig = getConnectionConfig(config, qObj);
    console.log("Connect To Oracle...for createtable=>");
    console.log(connectionConfig);
    oracledb.autoCommit = true;
    oracledb.getConnection(connectionConfig, (err, conn) => {
        if (err) {
            console.log(err);
            util.writeError(err.message, res);
            doRelease(conn);
            return;
        }
        // var query = qObj["query"]; //INSERT INTO...
        var query = "create table todo_maria (id number,text varchar2(50),checked number constraint booleancheck check(checked in (-1,1)))";
        //var result = await conn.execute(query);
        conn.execute(query, [], function (err, result) {
            if (err) {
                console.log(err);
                util.writeError(err.message, res);
                doRelease(conn);
                return;
            }
            util.writeSuccess({ updated: result.rowsAffected + "" }, res);
            doRelease(conn);
            return;
        });
    });
}


async function executeAsync(config, qObj, res) {
    let connection;

    try {
        console.log(qObj);
        var connectionConfig = getConnectionConfig(config, qObj);
        console.log("Connect To Oracle...for excute=>");
        console.log(connectionConfig);
        oracledb.autoCommit = true;

        connection = await oracledb.getConnection(connectionConfig);

        //await demoSetup.setupBf(connection); // create the demo table

        var mCharset = "utf-8";
        var query = qObj["query"]; //INSERT INTO...
        // var query = "select * from todo_maria"
        var outputFormat = "json"; //default : xml <- &outputformat=json
        if (!outputFormat) {
            outputFormat = "xml";
        }
        console.log(outputFormat);
        const result = await connection.execute(
            query,
            [], // no bind variables
            {
                resultSet: true, // return a ResultSet (default is false)
                // prefetchRows:   100,      // internal buffer allocation size for tuning
                // fetchArraySize: 100       // internal buffer allocation size for tuning
            }
        );

        if (query.toLocaleLowerCase().trim().indexOf("select") == -1) {
            util.writeSuccess({ updated: result.rowsAffected + "" }, res);
            //doRelease(connection);
            return;
        }

        //console.log(result.lastRowid); //테이블 스키마 [{name:"필드명1"}, {name:"필드명2"}, ...]
        var numColumns = 0;
        try {
            numColumns = result.metaData.length;
        } catch (e) { }
        console.log(result.metaData);
        console.log("COLUMNS=>" + numColumns);
        const rs = result.resultSet;
        let row;
        let i = 1;

        var retBuf = null;
        var inBuf = null;
        var UniOutput = null;
        var fileName = "";
        var dir, sep;

        //console.log(result.rowsAffected);
        if (outputFormat == "xml") {
            inBuf = "";
            retBuf = "";
        } else {
            inBuf = {};
            retBuf = [];
        }
        var rowCount = 0;
        while ((row = await rs.getRow())) {
            //console.log("getRow(): row " + i++);
            //console.log(row); //<- array
            if (outputFormat == "xml") {
                inBuf += "<row>";
                inBuf += "\n";
            } else {
                inBuf = {};
            }
            for (var index = 0; index < numColumns; index++) {
                var columnName = result.metaData[index]["name"];
                var value = row[index];
                //console.log("ROW " + rowCount, columnName + "=>", value, typeof(value));
                if (value == null) value = "";
                if (typeof value == "string") {
                    value = value.replace("\r", "&#xD;"); //chr(13): CR
                    value = value.replace("\n", "&#xA;"); //chr(10): LF
                }

                if (outputFormat == "xml") {
                    inBuf += '<col name="' + columnName + '" type="variant">';
                    inBuf += "<![CDATA[";
                    inBuf += value;
                    inBuf += "]]>";
                    inBuf += "</col>";
                    inBuf += "\n";
                } else {
                    inBuf[columnName] = value;
                }
            }
            if (outputFormat == "xml") {
                inBuf += "</row>";
                inBuf += "\n";
            } else {
                retBuf.push(inBuf);
            }

            rowCount++;
        }
        // always close the ResultSet
        await rs.close();
        if (outputFormat == "xml") {
            retBuf += '<?xml version="1.0" encoding="' + mCharset + '" ?>';
            retBuf += "\n";
            retBuf += '<resultset rows="' + rowCount + '">';
            retBuf += "\n";
            retBuf += inBuf;
            retBuf += "</resultset>";
            util.writeSuccess(retBuf, res, "text/xml");
        } else {
            util.writeSuccess(retBuf, res);
        }

        //var retStr = retBuf.join("");;
    } catch (err) {
        console.error(err);
        util.writeError(err.message, res);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
                util.writeError(err.message, res);
            }
        }
    }
}
async function execute(config, qObj, res) {
    executeAsync(config, qObj, res);
}

function todoWork(err, connection) {
    if (err) {
        console.log("conn err");
        console.error(err.message);
        return;
    }
    console.log("no ERROR");
    connection.execute(
        "select BUSEO_CD from P_INSA where EMP_CD=209003",
        [],
        function (err, result) {
            if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.metaData); //테이블 스키마
            console.log(result.rows); //데이터
            doRelease(connection);
        }
    );
}

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}

module.exports = {
    connect,
    insert,
    execute,
    update,
    remove,
    createtable,
    all
};
