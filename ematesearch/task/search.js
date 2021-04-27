
const axios = require("axios");
const searchquery = require("./search/searchquery.js");
const searchconvert = require("./search/searchconvert.js");
const searchkeyword = require("./search/searchkeyword.js");


async function search(config, qObj, res, req) {

    //Test 변수
    // qObj.class = "approval";
    // qObj.aOrd = "accuracy";
    // qObj.accOrrec = "created";
    // qObj.fieldname = "all";
    // qObj.gte = "default";
    // qObj.lt = "now";
    // qObj.pagenum = 0;
    // qObj.searchword = " ";
    // qObj.searchwordarr = [];
    // qObj.size = 5;
    // qObj.utc = "-540"
    // qObj.dateType = "season";
    // qObj.created = "20210125T170331+09:00";

    // qObj = {
        // from: 1,
        // size: 3,
        // fieldname: 'all',
        // searchword: ' ',
        // searchwordarr: [],
        // accOrrec: 'created',
        // aOrd: 'desc',
        // class: 'all',
        // pagenum: 0,
        // check: false,
        // dateType: 'custom',
        // gte: '20201109150000',
        // lt: '20210121150000',
        // utc: -540,
        // created: '20210129T034023',
        // term: 'thisWeek',
        // cookie: 'IWASessId=5E1FB22574AD0606FD45390E6F450686; language=en; DomAuthSessId=38906A772BC68DBBC646AEE195F7E5E9',
        // kgte: '20210124000000',
        // klt: '20210129034024',
        // sessionId: 'DomAuthSessId=38906A772BC68DBBC646AEE195F7E5E9',
        // readers: ["[sysadmin]"]
    //   };
    
    var url = `${config.getReaders}`;

    await axios({
            method: 'get',
            url: url,
            headers: {
                "Cookie": qObj.cookie,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                //console.log(response.data,"도미노!!!!!!!");
                qObj.readers = response.data;
                // qObj.readers = ["[sysadmin]"];
            }).catch(error => {
                throw new Error(error);
            });

    //elasticsearch Authorization
    const id = config.elastic_id + ":" + config.elastic_pw;
    var authorization = Buffer.from(id, "utf8").toString('base64');
    var url = `${config.elastic_address[config.version]}/${config.default_index[config.nowversion]}/`;

    //msearch or search query 받기
    var stringquery = "";
    var functionName = "";

    stringquery = await searchquery.MsearchQuery(qObj);
    console.log(stringquery,"stringquery");
    console.log('MsearchConvert 여기로 들어옴');
    functionName = "MsearchConvert";
    url += "_msearch";

    await axios({
        method: 'post',
        url: url,
        data: stringquery,
        headers: {
            Authorization: 'Basic ' + authorization,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            var data = response.data;
            // console.log('data시작');
            console.log(JSON.stringify(data), "search.js hi");
            //data 구조 변환
            eval(`searchconvert.${functionName}(data,res,qObj,config)`);
        }).catch(error => {
            throw new Error(error);
        });

    searchkeyword.InsertKeyword(config, qObj, res, req);

};

module.exports = {
    search,
};