const config = require("./config.json");
const util = require("./lib/util.js");
const logger = require("./lib/log.js");

const axios = require("axios");
const fs = require("fs");
//const template = require("./lib/v7_search_schem.json");

try {
    var requestUrl =
        config.search.elasticsearchHost +
        "/" +
        config.search.elasticsearchDatabase + "/_search";
    var id = config.search.elasticsearchId;
    var pwd = config.search.elasticsearchPassword;
    var strAuth = id + ":" + pwd;
    var strEncodingAuth = Buffer.from(strAuth).toString("base64");
    logger.info("Authorization", "Basic " + strEncodingAuth);

    var jsonFilePath = __dirname +  "/lib/v7_search_schem.json"; //'..' 는 상위 폴더
    console.log(jsonFilePath);
    var data = fs.readFileSync(jsonFilePath, "utf8");
    console.log(data);
    axios({
        method: "POST",
        url: requestUrl,
        data: data,
        headers: {
            Authorization: "Basic " + strEncodingAuth,
        },
        responseType: "arraybuffer",
    }).then(function (response) {
        logger.info(response.data);
    });
    
} catch (error) {
    console.error(error);
}
