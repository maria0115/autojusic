var config = require("../config.json");
const util = require("../lib/util.js");
const logger = require("../lib/log.js");
const fs = require("fs");
const path = require("path");
var fc = null;
try {
  fc = require("fs").readFileSync("content.txt").toString();
} catch (e) {
  fc = "Content File Not Found in current directory";
}

var mDebugging = true;
var getDebugging = function () {
  return mDebugging;
};
var setDebugging = function (debugging_) {
  mDebugging = debugging_;
  msgbox("mDebugging := " + mDebugging);
};

var THIS = null;

function setError(e) {
  mErrCode = 400; //error
  mError = e.message;
  mExeError = e.message;
  console.error(e);
}

function printErrorResponse(e, response) {
  if (response != null) {
    util.writeError(e.message, response);
  } else {
    console.log(e);
  }
}

function printResponse(response, val, contentType) {
  /*
  if (!contentType) {
    contentType = "";
  }
  if (response != null) {
    var headerObj = {};
    if (contentType.toLowerCase().indexOf("xml") != -1) {
      headerObj["Content-Type"] = 'text/xml; charset="UTF-8"';
    } else if (contentType.toLowerCase().indexOf("json") != -1) {
      headerObj["Content-Type"] = 'application/json; charset="UTF-8"';
    } else if (contentType.toLowerCase().indexOf("html") != -1) {
      headerObj["Content-Type"] = 'text/html; charset="UTF-8"';
    } else {
      headerObj["Content-Type"] = 'text/plain; charset="UTF-8"';
    }
    response.writeHead(500, headerObj);

    if (typeof (val) == "object") {
      response.end(JSON.stringify(val));
    } else {
      response.end(val);
    }
  } else {
    if (typeof (val) == "object") {
      console.log(JSON.stringify(val));
    } else {
      console.log(val);
    }
  }
  */
  if (response != null) {
    util.writeSuccess(val, response);
  } else {
    console.log(e);
  }
}

var mClassPath = "";
var setDatabaseDriverClassPath = function (path_) {
  //ex : "oracle.jdbc.driver.OracleDriver"
  mClassPath = path_;
  msgbox("mClassPath := " + mClassPath);
};

var getDatabaseDriverClassPath = function () {
  console.log("getDatabaseDriverClassPath..." + __dirname);
  var productName = getGlobalVar("productname");
  if (mClassPath != "") {
    //c = Class.forName(this.mClassPath);
  } else {
    if (productName.toLowerCase().indexOf("oracle") != -1) {
      mClassPath = "oracle.jdbc.driver.OracleDriver";
    } else if (
      productName.toLowerCase().indexOf("ms-sql") != -1 ||
      productName.toLowerCase().indexOf("mssql") != -1
    ) {
      mClassPath = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    } else if (productName.toLowerCase().indexOf("db2") != -1) {
      mClassPath = "com.ibm.db2.jcc.DB2Driver";
    } else if (productName.toLowerCase().indexOf("as400") != -1) {
      //jdbc:as400://localhost/db2;factory=com.ibm.as400.access.AS400JDBCObjectFactory
      mClassPath = "com.ibm.as400.access.AS400JDBCDriver";
    } else if (productName.toLowerCase().indexOf("mysql") != -1) {
      //jdbc:mysql://localhost/test
      mClassPath = "com.mysql.jdbc.Driver";
    } else if (productName.toLowerCase().indexOf("informix") != -1) {
      mClassPath = "com.informix.jdbc.IfxDriver"; // jdbc:informix-sqli://123.45.67.89:1533:INFORMIXSERVER=myserver;user=rdt est;password=test
    } else if (productName.toLowerCase().indexOf("sybase") != -1) {
      mClassPath = "com.sybase.jdbc2.jdbc.SybDriver"; //jdbc:jtds:sybase://127.0.0.1:5000/SAMPLE
    } else if (productName.toLowerCase().indexOf("mariadb") != -1) {
      mClassPath = "org.mariadb.jdbc.Driver"; //jdbc:mariadb://127.0.0.1:3306/database
    }
  }
  return mClassPath;
};

async function ping(config, qObj, res) {
  console.log("ping...");
  util.writeSuccess("pong", res);
  return;
};

function setGlobalVariables(qObj) {
  try {
    if (!qObj) {
      msgbox("setGlobalVariables is FALSE");
      return null;
    }
    for (var key in config.dbms) {
      if (THIS == null) THIS = {};
      THIS[key.toLowerCase()] = config.dbms[key];
    }
    for (var key in qObj) {
      if (THIS == null) THIS = {};
      THIS[key.toLowerCase()] = qObj[key];
    }
    msgbox("***CHARSET:" + getGlobalVar("Charset"));

    if (getGlobalVar("Charset") == "") {
      THIS["charset"] = "utf-8";
    }

    console.log(THIS);
  } catch (e) {
    setError(e);
    return;
  }
}

function getGlobalVar(key) {
  var ret = "";
  try {
    var rKey = key.toLowerCase();
    if (THIS != null) {
      console.log("THIS is NOT NULL <-key=" + rKey);
      if (THIS[rKey]) {
        ret = THIS[rKey];
      }
      console.log(ret);
    } else {
      console.log("THIS is NULL");
    }
  } catch (e) { }
  return ret;
}

async function connect(config, qObj, res) {
  try {
    setGlobalVariables(qObj);
    if (THIS == null) {
      throw new Error("Properties is not found.");
    }
    //var classPath = getDatabaseDriverClassPath();
    //msgbox("java.lang.Class.forName => " + classPath);
    //java.callStaticMethod("java.lang.Class", "forName", classPath);

    var productName = getGlobalVar("productname");
    //productName = productName.tolowerCase();
    console.log(productName);
    var nodejdbc = require("./" + productName + "/nodejdbc.js");
    nodejdbc.connect(config, THIS, res);
  } catch (e) {
    setError(e);
    printErrorResponse(e, response);
    return;
  }
};

async function getProcedureList(config, qObj, res) {
  try {
    var msg = "더이상 지원하지 않는 기능입니다.";
    console.log(msg);
    util.writeError(msg, res);
  } catch (e) {
    setError(err);
    printErrorResponse(err, res);
    return;
  }
};

async function getTableList(config, qObj, res) {
  try {
    var msg = "더이상 지원하지 않는 기능입니다.";
    console.log(msg);
    util.writeError(msg, res);
  } catch (e) {
    setError(err);
    printErrorResponse(err, res);
    return;
  }
};

async function getFieldList(config, qObj, res) {
  try {
    var msg = "더이상 지원하지 않는 기능입니다.";
    console.log(msg);
    util.writeError(msg, res);
  } catch (e) {
    setError(err);
    printErrorResponse(err, res);
    return;
  }
};

async function commit() {
  //WAS 환경에서는 지원하지 않음
  var ret = true;
  return ret;
};

async function rollback() {
  //WAS 환경에서는 지원하지 않음
  var ret = true;
  return ret;
};

async function disconnection() {
  //WAS 환경에서는 지원하지 않음
  var ret = true;
  return ret;
};

async function executeprocedure(config, qObj, res) {
  try {
    var msg = "아직 지원하지 않는 기능입니다.";
    console.log(msg);
    util.writeError(msg, res);
  } catch (e) {
    setError(err);
    printErrorResponse(err, res);
    return;
  }
};

async function selectquery(config, qObj, res) {
  execute(config, qObj, res);
};

async function select(config, qObj, res) {
  execute(config, qObj, res);
};

async function execute(config, qObj, res) {
  try {
    setGlobalVariables(qObj);
    if (THIS == null) {
      throw new Error("Properties is not found.");
    }
    //var classPath = getDatabaseDriverClassPath();
    //msgbox("java.lang.Class.forName => " + classPath);
    //java.callStaticMethod("java.lang.Class", "forName", classPath);

    var productName = getGlobalVar("productname");
    //productName = productName.tolowerCase();
    console.log(productName);
    var nodejdbc = require("./" + productName + "/nodejdbc.js");
    nodejdbc.execute(config, THIS, res);
  } catch (e) {
    setError(e);
    printErrorResponse(e, response);
    return;
  }
};

async function insert(config, qObj, res) {
  try {
    setGlobalVariables(qObj);
    if (THIS == null) {
      throw new Error("Properties is not found.");
    }
    //var classPath = getDatabaseDriverClassPath();
    //msgbox("java.lang.Class.forName => " + classPath);
    //java.callStaticMethod("java.lang.Class", "forName", classPath);

    var productName = getGlobalVar("productname");
    //productName = productName.tolowerCase();
    console.log(productName);
    var nodejdbc = require("./" + productName + "/nodejdbc.js");
    nodejdbc.insert(config, THIS, res);
  } catch (e) {
    setError(e);
    printErrorResponse(e, response);
    return;
  }
};

async function update(config, qObj, res) {
  try {
    setGlobalVariables(qObj);
    if (THIS == null) {
      throw new Error("Properties is not found.");
    }
    //var classPath = getDatabaseDriverClassPath();
    //msgbox("java.lang.Class.forName => " + classPath);
    //java.callStaticMethod("java.lang.Class", "forName", classPath);

    var productName = getGlobalVar("productname");
    //productName = productName.tolowerCase();
    console.log(productName);
    var nodejdbc = require("./" + productName + "/nodejdbc.js");
    nodejdbc.update(config, THIS, res);
  } catch (e) {
    setError(e);
    printErrorResponse(e, response);
    return;
  }
};

async function remove(config, qObj, res) {
  try {
    setGlobalVariables(qObj);
    if (THIS == null) {
      throw new Error("Properties is not found.");
    }
    //var classPath = getDatabaseDriverClassPath();
    //msgbox("java.lang.Class.forName => " + classPath);
    //java.callStaticMethod("java.lang.Class", "forName", classPath);

    var productName = getGlobalVar("productname");
    //productName = productName.tolowerCase();
    console.log(productName);
    var nodejdbc = require("./" + productName + "/nodejdbc.js");
    nodejdbc.remove(config, THIS, res);
  } catch (e) {
    setError(e);
    printErrorResponse(e, response);
    return;
  }
};

async function createtable(config, qObj, res) {
  try {
    setGlobalVariables(qObj);
    if (THIS == null) {
      throw new Error("Properties is not found.");
    }
    //var classPath = getDatabaseDriverClassPath();
    //msgbox("java.lang.Class.forName => " + classPath);
    //java.callStaticMethod("java.lang.Class", "forName", classPath);

    var productName = getGlobalVar("productname");
    //productName = productName.tolowerCase();
    console.log(productName);
    var nodejdbc = require("./" + productName + "/nodejdbc.js");
    nodejdbc.createtable(config, THIS, res);
  } catch (e) {
    setError(e);
    printErrorResponse(e, response);
    return;
  }
};

async function all(config, qObj, res) {
  try {
    setGlobalVariables(qObj);
    if (THIS == null) {
      throw new Error("Properties is not found.");
    }
    //var classPath = getDatabaseDriverClassPath();
    //msgbox("java.lang.Class.forName => " + classPath);
    //java.callStaticMethod("java.lang.Class", "forName", classPath);

    var productName = getGlobalVar("productname");
    //productName = productName.tolowerCase();
    console.log(productName);
    var nodejdbc = require("./" + productName + "/nodejdbc.js");
    nodejdbc.all(config, THIS, res);
  } catch (e) {
    setError(e);
    printErrorResponse(e, response);
    return;
  }
};

var getviewxml = function (body, response) {
  var resultSet = java.import("java.sql.ResultSet");
  var types = java.import("java.sql.Types");
  var ret = "";
  var date; // = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss/sss").format(new Date());
  //System.out.println("start getViewXML:"+date);
  try {
    setGlobalVariables(body);
    if (THIS == null) {
      throw new Error("Properties is not found.");
    }
    var dataQuery = getGlobalVar("dataQuery");
    var totalQuery = getGlobalVar("totalQuery");
    var countFieldName = getGlobalVar("countFieldName");
    var startPosition = getGlobalVar("startPosition");
    var mCharset = getGlobalVar("Charset");
    if (countFieldName == "") {
      countFieldName = "toplevelentries";
    }
    if (startPosition == "") {
      startPosition = 1;
    }
    var position = startPosition - 1;

    var inBuf = null;

    //?? ? ?? ??? Query? ????
    var totalCnt = "0";
    //date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss/sss").format(new Date());
    //var formater = java.newInstanceSync('java.text.SimpleDateFormat', 'yyyy-MM-dd HH:mm:ss/sss');
    //date = formater.formatSync(new Date());
    msgbox(
      "==================================Get Tot getViewXML:" + getTimeStamp()
    );
    var classPath = getDatabaseDriverClassPath();
    msgbox("java.lang.Class.forName => " + classPath);
    java.callStaticMethod("java.lang.Class", "forName", classPath);
    java.callStaticMethod(
      "java.sql.DriverManager",
      "getConnection",
      getGlobalVar("connectionString"),
      getGlobalVar("userID"),
      getGlobalVar("password"),
      function (err, conn) {
        if (err) {
          setError(err);
          printErrorResponse(err, response);
          return;
        }
        //msgbox("setAutoCommitSync...:" + isAutoCommit);
        //conn.setAutoCommitSync(isAutoCommit);
        var pstmt = null; //PreparedStatement pstmt = null;
        try {
          var concurType = resultSet.CONCUR_UPDATABLE;
          if (productName == "mssql") {
            concurType = resultSet.CONCUR_READ_ONLY;
          }
          pstmt = conn.prepareStatementSync(
            totalQuery,
            resultSet.TYPE_SCROLL_INSENSITIVE,
            concurType
          );
        } catch (e) {
          // TODO: handle exception
          pstmt = conn.prepareStatementSync(totalQuery);
        }

        //ResultSet rs = pstmt.executeQuery();
        pstmt.executeQuery(function (err, rs) {
          if (err) {
            setError(err);
            printErrorResponse(err, response);
            return;
          }

          inBuf = []; //StringBuffer inBuf = new StringBuffer("");
          inBuf.push('<?xml version="1.0" encoding="' + mCharset + '" ?>');
          inBuf.push("\n");
          msgbox("End Execute Tot getViewXML:" + getTimeStamp());

          var rsmd = rs.getMetaDataSync(); //ResultSetMetaData rsmd = rs.getMetaData();
          while (rs.nextSync()) {
            totalCnt = rs.getStringSync(countFieldName);
          }

          //date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss/sss").format(new Date());
          msgbox("End Fetch Tot getViewXML:" + getTimeStamp());

          inBuf.push('<viewentries toplevelentries="' + totalCnt + '">');
          inBuf.push("\n");

          //date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss/sss").format(new Date());
          msgbox("-------Start List getViewXML:" + getTimeStamp());
          try {
            var concurType = resultSet.CONCUR_UPDATABLE;
            if (productName == "mssql") {
              concurType = resultSet.CONCUR_READ_ONLY;
            }
            pstmt = conn.prepareStatementSync(
              dataQuery,
              resultSet.TYPE_SCROLL_INSENSITIVE,
              concurType
            );
          } catch (e) {
            // TODO: handle exception
            pstmt = conn.prepareStatementSync(dataQuery);
          }

          //rs = pstmt.executeQuery();
          pstmt.executeQuery(function (err, rs) {
            if (err) {
              setError(err);
              printErrorResponse(err, response);
              return;
            }
            //date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss/sss").format(new Date());
            msgbox("-------Execute List getViewXML:" + getTimeStamp());

            rsmd = rs.getMetaDataSync();

            var numColumns = rsmd.getColumnCountSync();
            // Get the column names; column indices start from 1
            while (rs.nextSync()) {
              position++;
              var unid = "";
              try {
                unid = rs.getStringSync("UNID");
              } catch (e) {
                unid = getTimeStamp();
              }
              inBuf.push(
                '<viewentry position="' + position + '" unid="' + unid + '">'
              );
              inBuf.push("\n");
              var columnIndex = -1;
              for (var i = 1; i < numColumns + 1; i++) {
                var columnName = rsmd.getColumnNameSync(i);
                var columnType = rsmd.getColumnTypeSync(i);
                var valueNodeName = "text";
                if (isNumeric(columnType)) {
                  valueNodeName = "number";
                } else if (isDate(columnType)) {
                  valueNodeName = "datetime";
                }
                if (columnName.toLowerCase() != "unid") {
                  columnIndex++;
                  inBuf.push(
                    '<entrydata columnnumber="' +
                    columnIndex +
                    '" name="' +
                    columnName +
                    '">'
                  );
                  inBuf.push("<" + valueNodeName + ">");
                  inBuf.push("<![CDATA[");
                  //String values = rs.getString(columnName);
                  //if(!values.equals("null")){
                  //	inBuf.append(rs.getString(columnName));
                  //}
                  if (columnType != types.BLOB) {
                    inBuf.push(rs.getStringSync(columnName));
                  } else {
                    //BLOB? Byte Array String?? ???? ??
                    var files = rs.getBytes(columnName);
                    var arrayString = files.join("");
                    inBuf.push(arrayString);
                  }
                  inBuf.push("]]>");
                  inBuf.push("</" + valueNodeName + ">");
                  inBuf.push("\n");
                  inBuf.push("</entrydata>");
                  inBuf.push("\n");
                }
                //msgbox(rs.getString(columnName));
              }
              inBuf.push("</viewentry>");
              inBuf.push("\n");
            }
            //date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss/sss").format(new Date());
            msgbox("-------End List getViewXML:" + getTimeStamp());

            inBuf.push("</viewentries>");
            inBuf.push("\n");

            ret = inBuf.join(""); //toString();

            rs.close(function (err, rsEnd) {
              if (err) {
                setError(err);
                printErrorResponse(err, response);
                return;
              }
              pstmt.close(function (err, pstmtEnd) {
                if (err) {
                  setError(err);
                  printErrorResponse(err, response);
                  return;
                }
                conn.close(function (err, y) {
                  printResponse(response, ret, "xml");
                  msgbox("DONE getviewxml.");
                  return;
                });
              });
            });
          });
        });
      }
    );
  } catch (e) {
    //e.printStackTrace();
    setError(e);
  }
};

//public boolean deleteFile(String filePath){
var deleteFile = function (filePath, response) {
  fs.unlink(function (err, delend) {
    if (err) {
      setError(err);
      printErrorResponse(err, response);
      return;
    }
    if (response != null) {
      var bodyObj = {};
      bodyObj.result = true;
      printResponse(response, bodyObj, "json");
    }
  });
};

//private
function getObjectArray(tableXMLFilePath, TABLE_TYPE_NAME, STRUCT_TYPE_NAME) {
  var ret = null;
  if ((productName.toLowerCase() == "oracle") != -1) {
    //ret = this.getObjectArrayForOracle(tableXMLFilePath, TABLE_TYPE_NAME, STRUCT_TYPE_NAME);
  } else {
    //Oracle �̿���  DBMS�� ���� ó��
  }

  return ret;
}

//private ArrayList getProcedureInfo(String spName){
function getProcedureInfo(conn, spName) {
  var ret = null;
  try {
    //ret = new HashMap();
    var paramScheme = "";
    if (spName.toUpperCase().indexOf(".") != -1) {
      paramScheme = strLeft(spName.toUpperCase(), ".");
    }
    var paramSPName = spName.toUpperCase();
    if (paramSPName.indexOf(".") != -1) {
      paramSPName = strRight(paramSPName, ".");
    }

    var meta = conn.getMetaDataSync(); //DatabaseMetaData meta = conn.getMetaData();

    var res = null; //ResultSet res = null;
    if (paramScheme == "") {
      res = meta.getProcedureColumnsSync(null, null, paramSPName, null);
    } else {
      res = meta.getProcedureColumnsSync(null, paramScheme, paramSPName, null);
    }
    var rsmd = res.getMetaDataSync(); //ResultSetMetaData rsmd = res.getMetaData();
    var cols = rsmd.getColumnCountSync();

    /*
     * PROCEDURE_CAT
     PROCEDURE_SCHEM
     PROCEDURE_NAME
     COLUMN_NAME
     COLUMN_TYPE
     DATA_TYPE
     TYPE_NAME
     COLUMN_SIZE
     BUFFER_LENGTH
     DECIMAL_DIGITS
     NUM_PREC_RADIX
     NULLABLE
     REMARKS
	
     */
    while (res.nextSync()) {
      //ret.put("PROCEDURE_CAT", res.getString("PROCEDURE_CAT"));
      //ret.put("PROCEDURE_SCHEM", res.getString("PROCEDURE_SCHEM"));
      //ret.put("PROCEDURE_NAME", res.getString("PROCEDURE_NAME"));
      //msgbox("COLUMN_NAME=" + res.getString("COLUMN_NAME"));
      var column = {}; //new HashMap();
      //System.out.println("PPPPPPPPPPPPPPPPPPP=" + res.getString("COLUMN_NAME"));
      column.COLUMN_NAME = res.getStringSync("COLUMN_NAME");
      column.COLUMN_TYPE = res.getStringSync("COLUMN_TYPE");
      column.DATA_TYPE = res.getStringSync("DATA_TYPE");
      column.TYPE_NAME = res.getStringSync("TYPE_NAME");
      //column.put("COLUMN_SIZE", res.getString("COLUMN_SIZE"));
      //column.put("BUFFER_LENGTH", res.getString("BUFFER_LENGTH"));
      //column.put("DECIMAL_DIGITS", res.getString("DECIMAL_DIGITS"));
      //column.put("NUM_PREC_RADIX", res.getString("NUM_PREC_RADIX"));
      //column.put("NULLABLE", res.getString("NULLABLE"));
      column.REMARKS = res.getStringSync("REMARKS");
      //msgbox("COLUMN_NAME=" + res.getString("COLUMN_NAME"));
      if (ret == null) {
        ret = []; //new ArrayList();
      }
      //ret.put(res.getString("COLUMN_NAME"), column);
      ret.push(column);
    }
    res.close();
  } catch (e) {
    // TODO: handle exception
  } finally {
  }

  return ret;
}

//private Object getColumnValueByXMLNode(org.w3c.dom.NodeList cols, String columnName, int columnType){
function getColumnValueByXMLNode(cols, columnName, columnType) {
  var ret = null;
  var types = java.import("java.sql.Types");
  try {
    for (var idxCol = 0; idxCol < cols.getLengthSync(); idxCol++) {
      var col = cols.itemSync(idxCol); //org.w3c.dom.Element col = (org.w3c.dom.Element) cols.item(idxCol);
      if (
        col.getAttributeSync("name").toLowerCase() == columnName.toLowerCase()
      ) {
        //int columnType = metaData.getColumnType(i);
        var strValue = getCharacterDataFromElement(col);
        var formater = null; //DateFormat formater = null;
        var parsedUtilDate = null; //java.util.Date parsedUtilDate = null;

        switch (columnType) {
          case types.BIGINT:
            ret = strValue;
            ret *= 1; //String to Number
            break;
          case types.BIT:
            if (isBoolean === "true") {
              ret = true;
            } else {
              ret = false;
            }
            break;
          case types.DATE:
            //formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            formater = java.newInstanceSync(
              "java.text.SimpleDateFormat",
              "yyyy-MM-dd hh:mm:ss"
            );
            parsedUtilDate = formater.parseSync(strValue);
            //java.sql.Date sqltDate= new java.sql.Date(parsedUtilDate.getTime());
            ret = java.newInstanceSync(
              "java.sql.Date",
              parsedUtilDate.getTimeSync()
            );
            //ret = sqltDate;
            break;
          case types.TIMESTAMP:
            formater = java.newInstanceSync(
              "java.text.SimpleDateFormat",
              "yyyy-MM-dd hh:mm:ss"
            );
            parsedUtilDate = formater.parseSync(strValue);
            //java.sql.Timestamp sqlDatetime = new java.sql.Timestamp(parsedUtilDate.getTime());
            //ret = sqlDatetime;
            ret = java.newInstanceSync(
              "java.sql.Timestamp",
              parsedUtilDate.getTimeSync()
            );
            break;
          case types.TIME:
            //formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            //parsedUtilDate = formater.parse(strValue);
            formater = java.newInstanceSync(
              "java.text.SimpleDateFormat",
              "yyyy-MM-dd hh:mm:ss"
            );
            parsedUtilDate = formater.parseSync(strValue);

            //java.sql.Time sqlTime = new java.sql.Time(parsedUtilDate.getTime());
            //ret = sqlTime;
            ret = java.newInstanceSync(
              "java.sql.Time",
              parsedUtilDate.getTimeSync()
            );
            break;
          case types.DECIMAL:
            //BigDecimal bd = new BigDecimal(strValue);
            //ret = bd;
            ret = strValue;
            ret *= 1; //String to Number
            break;
          case types.INTEGER:
            //ret = Integer.parseInt(strValue);
            ret = strValue;
            ret *= 1; //String to Number
            break;
          case types.REAL:
            //ret = Float.parseFloat(strValue);
            ret = strValue;
            ret *= 1; //String to Number
            break;
          case types.SMALLINT:
            //ret = Short.parseShort(strValue);
            ret = strValue;
            ret *= 1; //String to Number
            break;
          case types.CLOB:
            //ret = new java.io.StringReader(strValue);
            ret = java.newInstanceSync("java.io.StringReader", strValue);
            break;
          case types.BLOB:
            var byteData = null; //byte[]  byteData = null;
            var file = null; //FileInputStream file = null;

            //file = new FileInputStream(strValue);
            file = java.newInstanceSync("java.io.FileInputStream", strValue);
            var size = file.availableSync();
            //byteData = new byte[size]; //byteData = new byte[size];
            byteData = new Array[size](); //byteData = new byte[size];
            file.readSync(byteData);
            ret = byteData;
            file.closeSync();
            break;
          default:
            ret = strValue;
            break;
        }
        break;
      }
    }
  } catch (e) {
    //e.printStackTrace();
    setError(e);
  }
  return ret;
}

//private static String getCharacterDataFromElement(org.w3c.dom.Element e) {
function getCharacterDataFromElement(e) {
  var child = e.getFirstChildSync(); //org.w3c.dom.Node child = e.getFirstChild();
  if (typeof child.indexOf("CharacterData".toUpperCase)) {
    //org.w3c.dom.CharacterData cd = (org.w3c.dom.CharacterData) child; //org.w3c.dom.CharacterData cd = (org.w3c.dom.CharacterData) child;
    return child.getDataSync();
  }
  return "";
}

//private String getReturnValueForResultSet(ResultSet rs, String paramPos){
function getReturnValueForResultSet(rs, paramPos) {
  var ret = "";
  var isClosed = false;
  var index = -1;
  try {
    index = paramPos;
    index *= 1;
  } catch (e) {
    // TODO: handle exception
    index = -1;
  }
  //var sep = "\\";
  //if (__dirname.indexOf("/") != -1) {
  //	sep = "/";
  //}
  //var dir = __dirname + sep + "results";
  //if (!fs.existsSync(dir)) {
  //	fs.mkdirSync(dir);
  //}
  //var fileName = "resultset_" + index + "_";
  //fileName += getTimeStamp(); //new SimpleDateFormat("yyyyMMddHHmmss_sss").format(new Date());
  //fileName += ".xml";
  //var UniOutput = fs.openSync(dir + sep + fileName, 'a');
  var inBuf = [];
  var mCharset = getGlobalVar("Charset");
  try {
    //UniOutput = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), this.mCharset));
    var rsmd = rs.getMetaDataSync(); //ResultSetMetaData rsmd = rs.getMetaData();
    var numColumns = rsmd.getColumnCountSync();
    // Get the column names; column indices start from 1
    //StringBuffer inBuf = new StringBuffer("");

    rs.lastSync();
    var rowCount = rs.getRowSync();
    msgbox("ROWS:" + rowCount);
    //inBuf.append("<?xml version=\"1.0\" encoding=\"" + this.mCharset + "\" ?>");
    //fs.appendFileSync(UniOutput, "<?xml version=\"1.0\" encoding=\"" + mCharset + "\" ?>", 'utf8');
    inBuf.push('<?xml version="1.0" encoding="' + mCharset + '" ?>');
    inBuf.push("\n");
    inBuf.push('<resultset rows="' + rowCount + '">');
    inBuf.push("\n");
    rs.beforeFirstSync();
    var row = 0;
    while (rs.nextSync()) {
      row++;
      //inBuf.append("<row>");
      inBuf.push("<row>");
      inBuf.push("\n");
      for (var i = 1; i < numColumns + 1; i++) {
        var columnName = rsmd.getColumnNameSync(i);
        var columnType = rsmd.getColumnTypeNameSync(i);
        //inBuf.append("<col name=\"" + columnName + "\">");
        inBuf.push('<col name="' + columnName + '" type="' + columnType + '">');
        inBuf.push("<![CDATA[");
        //String values = rs.getString(columnName);
        //if(!values.equals("null")){
        //inBuf.append(rs.getString(columnName));
        var columnValue = rs.getString(columnName);
        if (columnValue == null) columnValue = "";
        columnValue = columnValue.replaceAll("\r", "&#xD;"); //chr(13): CR
        columnValue = columnValue.replaceAll("\n", "&#xA;"); //chr(10): LF
        columnValue = columnValue.replaceAll(" ", "&nbsp;"); //space

        inBuf.push(columnValue);

        inBuf.push("]]>");
        inBuf.push("</col>");
        inBuf.push("\n");
      }
      inBuf.push("</row>");
      inBuf.push("\n");
    }
    inBuf.push("</resultset>");
    ret = inBuf.join("");
    rs.closeSync();
    isClosed = true;
  } catch (e) {
    //e.printStackTrace();
    setError(e);
  } finally {
    if (rs != null && isClosed) {
      try {
        rs.closeSync();
      } catch (e) {
        // TODO �ڵ� ���?catch ���?
        setError(e);
      }
    }
  }

  return ret;
}

//private void setParameterForStoredProcedure(java.sql.CallableStatement stmp, String strType, int nParameterPosition, String strValue, String strINOUT, String TABLE_NAME, String STRUCT_NAME){
function setParameterForStoredProcedure(
  stmp,
  strType,
  nParameterPosition,
  strValue,
  strINOUT,
  TABLE_NAME,
  STRUCT_NAME
) {
  /*
  if(this.productName.toLowerCase().indexOf("oracle") != -1){
    setParameterForORACLEStoredProcedure(stmp, strType, nParameterPosition, strValue, strINOUT, outParamName, outParamStructTypeName);
  }else if(this.productName.toLowerCase().indexOf("ms-sql") != -1 || this.productName.toLowerCase().indexOf("mssql") != -1){
    setPa`rameterForMSSQLStoredProcedure(stmp, strType, nParameterPosition, strValue, strINOUT, outParamName, outParamStructTypeName);
  }else if(this.productName.toLowerCase().indexOf("db2") != -1 || this.productName.toLowerCase().indexOf("db2") != -1){
    setParameterForDB2StoredProcedure(stmp, strType, nParameterPosition, strValue, strINOUT, outParamName, outParamStructTypeName);
  }
  */
  var types = java.import("java.sql.Types");
  try {
    if (
      strType.toLowerCase() == "long" ||
      strType.toLowerCase() == "bigint" ||
      strType == "" + types.BIGINT
    ) {
      //long
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          var realVal = strValue;
          realVal *= 1;
          stmp.setLongSync(nParameterPosition, realVal);
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(nParameterPosition, types.BIGINT);
      }
    } else if (
      strType.toLowerCase() == "bit" ||
      strType.toLowerCase() == "bool" ||
      strType.toLowerCase() == "boolean" ||
      strType == "" + types.BOOLEAN ||
      strType == "" + types.BIT
    ) {
      //boolean
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          var realVal = strValue;
          if (strValue === "true") {
            realVal = true;
          } else {
            realVal = false;
          }
          stmp.setBooleanSync(nParameterPosition, realVal);
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(nParameterPosition, types.BIT);
      }
    } else if (strType.toLowerCase() == "date" || strType == "" + types.DATE) {
      //java.sql.Date
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          //DateFormat formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
          //java.util.Date parsedUtilDate = formater.parse(strValue);
          //java.sql.Date sqltDate= new java.sql.Date(parsedUtilDate.getTime());

          var formater = java.newInstanceSync(
            "java.text.SimpleDateFormat",
            "yyyy-MM-dd hh:mm:ss"
          );
          var parsedUtilDate = formater.parseSync(strValue);
          var sqltDate = java.newInstanceSync(
            "java.sql.Date",
            parsedUtilDate.getTimeSync()
          );

          stmp.setDateSync(nParameterPosition, sqltDate);
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameter(nParameterPosition, java.sql.Types.DATE);
      }
    } else if (
      strType.toLowerCase() == "timestamp" ||
      strType.toLowerCase() == "datetime" ||
      strType.toLowerCase() == "datetime2" ||
      strType == "smalldatetime" ||
      strType == "" + types.TIMESTAMP
    ) {
      //java.sql.Timestamp
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          //DateFormat formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
          //java.util.Date parsedUtilDate = formater.parse(strValue);
          //java.sql.Timestamp sqlDatetime = new java.sql.Timestamp(parsedUtilDate.getTime());

          var formater = java.newInstanceSync(
            "java.text.SimpleDateFormat",
            "yyyy-MM-dd hh:mm:ss"
          );
          var parsedUtilDate = formater.parseSync(strValue);
          var sqlDatetime = java.newInstanceSync(
            "java.sql.Timestamp",
            parsedUtilDate.getTimeSync()
          );
          stmp.setTimestampSync(nParameterPosition, sqlDatetime);
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameter(nParameterPosition, java.sql.Types.TIMESTAMP);
      }
    } else if (strType.toLowerCase() == "time" || strType == "" + types.TIME) {
      //java.sql.Timestamp
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          //DateFormat formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
          //java.util.Date parsedUtilDate = formater.parse(strValue);
          //java.sql.Time sqlDatetime = new java.sql.Time(parsedUtilDate.getTime());
          var formater = java.newInstanceSync(
            "java.text.SimpleDateFormat",
            "yyyy-MM-dd hh:mm:ss"
          );
          var parsedUtilDate = formater.parseSync(strValue);
          var sqlDatetime = java.newInstanceSync(
            "java.sql.Time",
            parsedUtilDate.getTimeSync()
          );
          stmp.setTime(nParameterPosition, sqlDatetime);
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameter(nParameterPosition, java.sql.Types.TIME);
      }
    } else if (
      strType.toLowerCase() == "bigdecimal" ||
      strType == "" + types.DECIMAL
    ) {
      //BigDecimal
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          var realVal = strValue;
          realVal *= 1;
          //BigDecimal bd = new BigDecimal(strValue);
          stmp.setBigDecimalSync(nParameterPosition, realVal);
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(nParameterPosition, types.DECIMAL);
      }
    } else if (
      strType.toLowerCase() == "int" ||
      strType.toLowerCase() == "integer" ||
      strType == "" + yypes.INTEGER
    ) {
      //int
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          var realVal = strValue;
          realVal *= 1;
          stmp.setIntSync(nParameterPosition, realVal);
        }
      } else {
        stmp.registerOutParameterSync(nParameterPosition, types.INTEGER);
      }
    } else if (
      strType.toLowerCase() == "float" ||
      strType == "" + types.FLOAT ||
      strType == "" + types.REAL
    ) {
      //float
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          var realVal = strValue;
          realVal *= 1;
          stmp.setFloatSync(nParameterPosition, realVal);
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(nParameterPosition, types.REAL);
      }
    } else if (
      strType.toLowerCase() == "short" ||
      strType == "" + types.SMALLINT
    ) {
      //short
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          var realVal = strValue;
          realVal *= 1;
          stmp.setShortSync(nParameterPosition, realVal);
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(nParameterPosition, types.SMALLINT);
      }
    } else if (strType.toLowerCase() == "clob" || strType == "" + types.CLOB) {
      //Body-MIME Value
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          var realVal = java.newInstance("java.io.StringReader", strValue);
          stmp.setCharacterStreamSync(
            nParameterPosition,
            realVal,
            strValue.length
          );
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(nParameterPosition, types.CLOB);
      }
    } else if (strType.toLowerCase() == "blob" || strType == "" + types.BLOB) {
      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          /*
          byte[]  byteData = null;
          FileInputStream file = null;
        	
          file = new FileInputStream(strValue);
          int size = file.available();
          byteData = new byte[size];
          file.read(byteData);	
          stmp.setObject(nParameterPosition, byteData, Types.BLOB);
          */
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(nParameterPosition, types.BLOB);
      }
    } else if (
      strType.toLowerCase() == "table" ||
      strType == "" + types.ARRAY
    ) {
      //user-defined type(structure array=table), Procedure ������ Type Table�� ������ ���?

      if (strINOUT.indexOf("I") != -1) {
        if (strValue != "") {
          stmp.setArraySync(
            nParameterPosition,
            getObjectArray(strValue, TABLE_NAME, STRUCT_NAME)
          );
        }
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(
          nParameterPosition,
          types.ARRAY,
          TABLE_NAME
        );
      }
    } else if (
      strType.toLowerCase() == "cursor" ||
      strType == "" + types.JAVA_OBJECT
    ) {
      //DBMS�� TABLE�� ���� SELECT ���� ���?
      if (strINOUT.indexOf("I") != -1) {
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(nParameterPosition, types.JAVA_OBJECT);
      }
    } else {
      //String
      if (strINOUT.indexOf("I") != -1) {
        stmp.setStringSync(nParameterPosition, strValue);
      }
      if (strINOUT.indexOf("O") != -1) {
        stmp.registerOutParameterSync(nParameterPosition, types.VARCHAR);
      }
    }
  } catch (e) {
    msgbox("setParameterForStoredProcedure Exception...");
    setError(e);
  }
}

//private void setParameter(java.sql.PreparedStatement stmp, String strType, int nParameterPosition, String strValue, String strINOUT){
function setParameter(stmp, strType, nParameterPosition, strValue, strINOUT) {
  /*
  if(this.productName.toLowerCase().indexOf("oracle") != -1){
    setParameterForORACLE(stmp, strType, nParameterPosition, strValue, strINOUT);
  }else if(this.productName.toLowerCase().indexOf("ms-sql") != -1 || this.productName.toLowerCase().indexOf("mssql") != -1){
    setParameterForMSSQL(stmp, strType, nParameterPosition, strValue, strINOUT);
  }else if(this.productName.toLowerCase().indexOf("db2") != -1 || this.productName.toLowerCase().indexOf("db2") != -1){
    setParameterForDB2(stmp, strType, nParameterPosition, strValue, strINOUT);
  }
  */
  var types = java.import("java.sql.Types");
  try {
    if (
      strType.toLowerCase() == "long" ||
      strType.toLowerCase() == "bigint" ||
      strType == "" + types.BIGINT
    ) {
      //long
      if (strValue != "") {
        var realVal = strValue;
        realVal *= 1;
        stmp.setLongSync(nParameterPosition, realVal);
      }
    } else if (
      strType.toLowerCase() == "bit" ||
      strType.toLowerCase() == "bool" ||
      strType.toLowerCase() == "boolean" ||
      strType == "" + types.BOOLEAN ||
      strType == "" + types.BIT
    ) {
      //boolean
      if (strValue != "") {
        var realVal = strValue;
        if (strValue === "true") {
          realVal = true;
        } else {
          realVal = false;
        }
        stmp.setBooleanSync(nParameterPosition, realVal);
      }
    } else if (strType.toLowerCase() == "date" || strType == "" + types.DATE) {
      //java.sql.Date
      if (strValue != "") {
        //DateFormat formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        //java.util.Date parsedUtilDate = formater.parse(strValue);
        //java.sql.Date sqltDate = new java.sql.Date(parsedUtilDate.getTime());
        //stmp.setDate(nParameterPosition, sqltDate);
        var formater = java.newInstanceSync(
          "java.text.SimpleDateFormat",
          "yyyy-MM-dd hh:mm:ss"
        );
        var parsedUtilDate = formater.parseSync(strValue);
        var sqltDate = java.newInstanceSync(
          "java.sql.Date",
          parsedUtilDate.getTimeSync()
        );

        stmp.setDateSync(nParameterPosition, sqltDate);
      }
    } else if (
      strType.toLowerCase() == "timestamp" ||
      strType.toLowerCase() == "datetime" ||
      strType.toLowerCase() == "datetime2" ||
      strType == "smalldatetime" ||
      strType == "" + types.TIMESTAMP
    ) {
      if (strValue != "") {
        //DateFormat formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        //java.util.Date parsedUtilDate = formater.parse(strValue);
        //java.sql.Timestamp sqlDatetime = new java.sql.Timestamp(parsedUtilDate.getTime());
        //stmp.setTimestamp(nParameterPosition, sqlDatetime);
        var formater = java.newInstanceSync(
          "java.text.SimpleDateFormat",
          "yyyy-MM-dd hh:mm:ss"
        );
        var parsedUtilDate = formater.parseSync(strValue);
        var sqlDatetime = java.newInstanceSync(
          "java.sql.Timestamp",
          parsedUtilDate.getTimeSync()
        );
        stmp.setTimestampSync(nParameterPosition, sqlDatetime);
      }
    } else if (strType.toLowerCase() == "time" || strType == "" + types.TIME) {
      //java.sql.Timestamp
      if (strValue != "") {
        //DateFormat formater = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        //java.util.Date parsedUtilDate = formater.parse(strValue);
        //java.sql.Time sqlDatetime = new java.sql.Time(parsedUtilDate.getTime());
        var formater = java.newInstanceSync(
          "java.text.SimpleDateFormat",
          "yyyy-MM-dd hh:mm:ss"
        );
        var parsedUtilDate = formater.parseSync(strValue);
        var sqlDatetime = java.newInstanceSync(
          "java.sql.Time",
          parsedUtilDate.getTimeSync()
        );
        stmp.setTime(nParameterPosition, sqlDatetime);
      }
    } else if (
      strType.toLowerCase() == "bigdecimal" ||
      strType == "" + types.DECIMAL
    ) {
      //BigDecimal
      if (strValue != "") {
        var realVal = strValue;
        realVal *= 1;
        //BigDecimal bd = new BigDecimal(strValue);
        stmp.setBigDecimalSync(nParameterPosition, realVal);
      }
    } else if (
      strType.toLowerCase() == "int" ||
      strType.toLowerCase() == "integer" ||
      strType == "" + yypes.INTEGER
    ) {
      //int
      if (strValue != "") {
        var realVal = strValue;
        realVal *= 1;
        stmp.setIntSync(nParameterPosition, realVal);
      }
    } else if (
      strType.toLowerCase() == "float" ||
      strType == "" + types.FLOAT ||
      strType == "" + types.REAL
    ) {
      if (strValue != "") {
        var realVal = strValue;
        realVal *= 1;
        stmp.setFloatSync(nParameterPosition, realVal);
      }
    } else if (
      strType.toLowerCase() == "short" ||
      strType == "" + types.SMALLINT
    ) {
      //short
      if (strValue != "") {
        var realVal = strValue;
        realVal *= 1;
        stmp.setShortSync(nParameterPosition, realVal);
      }
    } else if (strType.toLowerCase() == "clob" || strType == "" + types.CLOB) {
      //Body-MIME Value
      if (strValue != "") {
        var realVal = java.newInstance("java.io.StringReader", strValue);
        stmp.setCharacterStreamSync(
          nParameterPosition,
          realVal,
          strValue.length
        );
      }
    } else if (strType.toLowerCase() == "blob" || strType == "" + types.BLOB) {
      if (strValue != "") {
        /*
        byte[]  byteData = null;
        FileInputStream file = null;
	
        file = new FileInputStream(strValue);
        int size = file.available();
        byteData = new byte[size];
        file.read(byteData);
        stmp.setObject(nParameterPosition, byteData, Types.BLOB);
        */
      }
    } else {
      //String
      stmp.setStringSync(nParameterPosition, strValue);
    }
  } catch (e) {
    setError(e);
  }
}

//private Object getParameterValue(java.sql.CallableStatement stmp, String strType, String paramPosition){
function getParameterValue(stmp, strType, paramPosition) {
  var ret = null;
  try {
    var paramIndex = -1;
    try {
      //paramIndex = Integer.parseInt(paramPosition);
      paramIndex = paramPosition;
      paramIndex *= 1;
    } catch (e) {
      // TODO: handle exception
      paramIndex = -1;
    }
    if (strType.toLowerCase() == "long") {
      //long
      try {
        ret = stmp.getLongSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getLongSync(paramPosition);
      }
    } else if (
      strType.toLowerCase() == "bit" ||
      strType.toLowerCase() == "bool" ||
      strType.toLowerCase() == "boolean"
    ) {
      //boolean
      try {
        ret = stmp.getBooleanSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getBooleanSync(paramPosition);
      }
    } else if (strType.toLowerCase() == "date") {
      //java.sql.Date
      try {
        ret = stmp.getDateSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getDateSync(paramPosition);
      }
    } else if (
      strType.toLowerCase() == "timestamp" ||
      strType.toLowerCase() == "datetime" ||
      strType.toLowerCase() == "datetime2" ||
      strType == "smalldatetime"
    ) {
      //java.sql.Timestamp
      try {
        ret = stmp.getTimestampSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getTimestampSync(paramPosition);
      }
    } else if (strType.toLowerCase() == "time") {
      //java.sql.Timestamp
      try {
        ret = stmp.getTimeSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getTimeSync(paramPosition);
      }
    } else if (strType.toLowerCase() == "bigdecimal") {
      //BigDecimal
      try {
        ret = stmp.getBigDecimalSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getBigDecimalSync(paramPosition);
      }
    } else if (
      strType.toLowerCase() == "int" ||
      strType.toLowerCase() == "integer"
    ) {
      //int
      try {
        ret = stmp.getIntSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getIntSync(paramPosition);
      }
    } else if (strType.toLowerCase() == "float") {
      //float
      try {
        ret = stmp.getFloatSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getFloatSync(paramPosition);
      }
    } else if (strType.toLowerCase() == "short") {
      //short
      try {
        ret = stmp.getShortSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getShortSync(paramPosition);
      }
    } else if (strType.toLowerCase() == "clob") {
      //Body-MIME Value
      try {
        ret = stmp.getClobSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getClobSync(paramPosition);
      }
    } else if (strType.toLowerCase() == "blob") {
      try {
        ret = stmp.getBlobSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getBlobSync(paramPosition);
      }
    } else {
      //String
      try {
        ret = stmp.getStringSync(paramIndex);
      } catch (e) {
        // TODO: handle exception
        ret = stmp.getStringSync(paramPosition);
      }
    }
  } catch (e) {
    setError(e);
  }
  return ret;
}

function mAddParameter(
  type_,
  value,
  isOutput,
  outTableName,
  outParamStructTypeName
) {
  if (isOutput) {
    arrParam.push(
      type +
      "" +
      value +
      "" +
      "O" +
      "" +
      outTableName +
      "" +
      outParamStructTypeName
    );
  } else {
    arrParam.push(
      type +
      "" +
      value +
      "" +
      "I" +
      "" +
      outTableName +
      "" +
      outParamStructTypeName
    );
  }
}

function getPatternMatchedString(matchPattern, findPattern, dest_) {
  var ret = "";
  try {
    var pt = java.callStaticMethodSync(
      "java.util.regex.Pattern",
      "compile",
      matchPattern
    ); //Pattern pt = Pattern.compile(this.mMatchPatternString);
    var mc = pt.matcherSync(dest_); //Matcher mc = pt.matcher(dest_);
    if (mc.matchesSync()) {
      //msgbox("????-??");
      pt = java.callStaticMethodSync(
        "java.util.regex.Pattern",
        "compile",
        findPattern
      );
      mc = pt.matcherSync(dest_.trim());
      while (mc.findSync()) {
        ret = dest_.substring(mc.startSync(), mc.endSync());
      }
    } else {
      //msgbox("????-???");
    }
  } catch (e) {
    setError(e);
  } finally {
  }
  msgbox("getPatternMatchedString => " + ret);
  return ret;
}

function msgbox(txt) {
  if (mDebugging) {
    console.log(txt);
  }
}

var URLQueryString = function (sSource, sSeparator1) {
  var sRight = "";
  var sLeft = "";
  var sReturn = "";
  //var specialChars = '`~!@#$%^*()_+-{}[]|\':";<>?,/';
  var arr = sSource.split("&");
  var foundKey = false;
  var tmpKey;
  var arrChar = [];
  arrChar.push("~");
  arrChar.push("`");
  arrChar.push("!");
  arrChar.push("@");
  arrChar.push("#");
  arrChar.push("$");
  arrChar.push("%");
  arrChar.push("^");
  arrChar.push("*");
  arrChar.push("(");
  arrChar.push(")");
  arrChar.push("-");
  arrChar.push("+");
  arrChar.push("{");
  arrChar.push("}");
  arrChar.push("[");
  arrChar.push("]");
  arrChar.push(":");
  arrChar.push(";");
  arrChar.push('"');
  arrChar.push("'");
  arrChar.push("<");
  arrChar.push(">");
  arrChar.push(",");
  arrChar.push("?");
  arrChar.push("/");
  var foundSpecialChar = false;
  // x=1&y=2&z=3 => [0] x=1 [1] y=2 [2] z=3
  for (var index = 0; index < arr.length; index++) {
    if (foundKey) {
      if (arr[index].indexOf("=") > 0) {
        tmpKey = strLeft(arr[index], "=");
        foundSpecialChar = false;
        for (var idx = 0; idx < arrChar.length; idx++) {
          if (tmpKey.indexOf(arrChar[idx]) != -1) {
            foundSpecialChar = true;
            break;
          }
        }
        if (foundSpecialChar) {
          sReturn += "&" + arr[index];
        } else {
          break;
        }
      } else {
        sReturn += "&" + arr[index];
      }
    }
    if (
      arr[index].toLowerCase().indexOf(sSeparator1.toLowerCase() + "=") == 0
    ) {
      foundKey = true;
      sReturn = strRight(arr[index], "=");
    }
    if (index >= arr.length - 1) {
      break;
    }
  }
  return sReturn;
};

function strLeft(str, sKey, ContainsKey) {
  if (!ContainsKey) ContainsKey = false;

  var nIndex;
  var sRet = "";

  nIndex = str.indexOf(sKey);

  if (nIndex != -1) {
    sRet = str.substr(0, nIndex);
    if (ContainsKey) sRet += sKey;
  }
  return sRet;
}

function strLeftBack(str, sKey, ContainsKey) {
  if (!ContainsKey) ContainsKey = false;

  var nIndex;
  var sRet = "";

  nIndex = str.lastIndexOf(sKey);
  if (nIndex != -1) {
    sRet = str.substr(0, nIndex);
    if (ContainsKey) sRet += sKey;
  }
  return sRet;
}

function strRight(str, sKey, ContainsKey) {
  if (!ContainsKey) ContainsKey = false;

  var nIndex;
  var sRet = "";

  nIndex = str.indexOf(sKey);
  if (nIndex != -1) {
    if (ContainsKey) {
      sRet = str.substr(nIndex, str.length);
    } else {
      sRet = str.substr(nIndex + sKey.length, str.length);
    }
  }
  return sRet;
}

function strRightBack(str, sKey, ContainsKey) {
  if (!ContainsKey) ContainsKey = false;

  var nIndex;
  var sRet = "";

  nIndex = str.lastIndexOf(sKey);
  if (nIndex != -1) {
    if (ContainsKey) {
      sRet = str.substr(nIndex, str.length);
    } else {
      sRet = str.substr(nIndex + sKey.length, str.length);
    }
  }
  return sRet;
}

function strMid(str, sKey1, sKey2, ContainsLeftKey, ContainsRightKey) {
  if (!ContainsLeftKey) ContainsLeftKey = false;
  if (!ContainsRightKey) ContainsRightKey = false;

  var sRight, sLeft;
  var sRet = "";

  sRight = strRight(str, sKey1);
  if (
    typeof sKey2 == "undefined" ||
    typeof sKey2 == undefined ||
    sKey2 == null
  ) {
    console.log("strMid::second key is undefined!");
    sLeft = "";
  } else {
    sLeft = strLeft(sRight, sKey2);
  }
  if (sLeft != "") {
    sRet = sLeft;
    //좌측 검색어를 포함하는 경우
    if (ContainsLeftKey) {
      sRet = sKey1 + sLeft;
    }
    //우측 검색어를 포함하는 경우
    if (ContainsRightKey) {
      sRet += sKey2;
    }
  } else {
    //두번째 키가 없으면 첫번째 키로부터 끝까지
    sRet = sRight;
  }

  return sRet;
}

var getTimeStamp = function () {
  var serverTime = new Date();
  var offset = serverTime.getTimezoneOffset();
  var offsetFromGMT = (offset / 60) * -1 + "";

  var tzDigit = offsetFromGMT;
  var sign = "+";
  if (tzDigit.indexOf("-") != -1) {
    sign = "-";
  }

  tzDigit = tzDigit.replace(sign, ""); //-9 -> 9
  tzDigit = (tzDigit > 9 ? "" : "0") + tzDigit; //9 -> 09
  tzDigit = "00" + sign + tzDigit; // 09 -> 00+09 or 00-09

  //20200205T235503 변환
  var mm = serverTime.getMonth() + 1;
  var dd = serverTime.getDate();
  var ymd = [
    serverTime.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("");

  var hh = serverTime.getHours();
  var min = serverTime.getMinutes();
  var sec = serverTime.getSeconds();
  var msec = serverTime.getMilliseconds();
  var hms = [
    (hh > 9 ? "" : "0") + hh,
    (min > 9 ? "" : "0") + min,
    (sec > 9 ? "" : "0") + sec,
  ].join("");
  var ret = ymd + "T" + hms + "." + msec;
  return ret;
};

function leadingZeros(n, digits) {
  var zero = "";
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
}

function isNumeric(columnType) {
  var ret = false;
  var types = java.import("java.sql.Types");
  if (
    columnType == types.BIGINT ||
    columnType == types.DECIMAL ||
    columnType == types.DOUBLE ||
    columnType == types.FLOAT ||
    columnType == types.INTEGER ||
    columnType == types.SMALLINT ||
    columnType == types.NUMERIC
  ) {
    ret = true;
  }

  return ret;
}

function isDate(columnType) {
  var ret = false;
  var types = java.import("java.sql.Types");
  if (
    columnType == types.DATE ||
    columnType == types.TIME ||
    columnType == types.TIMESTAMP
  ) {
    ret = true;
  }

  return ret;
}

module.exports = {
  ping,
  getProcedureList,
  getTableList,
  getFieldList,
  connect,
  execute,
  executeprocedure,
  insert,
  select,
  selectquery,
  getviewxml,
  deleteFile,
  getTimeStamp,
  update,
  remove,
  createtable,
  all,
};
