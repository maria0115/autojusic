const config = require("./config.json");
const util = require("./lib/util.js");
const logger = require("./lib/log.js");

const axios = require("axios");
const jsonfile = require("fs");

try {
    jsonfile.unlink("./index.json", function (err) {
        //if (err) throw err;
        var requestUrl =
            config.search.elasticsearchHost +
            "/" +
            config.search.elasticsearchDatabase +
            "?pretty";
        logger.info("DELETE URL", requestUrl);

        var id = config.search.elasticsearchId;
        var pwd = config.search.elasticsearchPassword;
        var strAuth = id + ":" + pwd;
        var strEncodingAuth = Buffer.from(strAuth).toString("base64");
        logger.info("Authorization", "Basic " + strEncodingAuth);
        axios({
            method: "DELETE",
            url: requestUrl,
            headers: {
                Authorization: "Basic " + strEncodingAuth,
            },
            responseType: "arraybuffer",
        }).then(function (response) {
            logger.info(response.data);
        });
    });
    
} catch (error) {
    console.error(error);
}
