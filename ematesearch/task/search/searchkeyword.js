const query = require('./searchkeyword/query.js');
// const configjson = require('../../config.json');
const axios = require('axios');

async function auto(config, qObj, res, req) {

    var stringquery = await query.AutoKeyword(qObj, config);

    const id = config.elastic_id + ":" + config.elastic_pw;
    var authorization = Buffer.from(id, "utf8").toString('base64');
    var url = `${config.elastic_address[config.version]}/${config.keyword_index[config.version]}/_search`;

    // console.log(JSON.stringify(stringquery));
    console.log(url);

    //elasticsearch 검색
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
            var result = response.data.aggregations.stations.buckets;
            console.log('result',result);
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json; charset=UTF-8");
            res.send(JSON.stringify(result));
        }).catch(error => {
            throw new Error(error);
        });


}

async function InsertKeyword(config, qObj, res, req) {
    // qObj.searchword = "1박 김선호";

    const id = config.elastic_id + ":" + config.elastic_pw;
    var authorization = Buffer.from(id, "utf8").toString('base64');
    var url = `${config.elastic_address[config.version]}/_bulk`;

    if (qObj.searchword !== " ") {
        var insertquery = await query.InsertKeywordQuery(qObj, config);
        console.log(insertquery, "insertquery");
        console.log("url",url);
        //elasticsearch 검색
        await axios({
            method: 'put',
            url: url,
            data: insertquery,
            headers: {
                Authorization: 'Basic ' + authorization,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.status);
            }).catch(error => {
                throw new Error(error);
            });
    }


}

async function PopularSearch(config, qObj, res, req) {
    var stringquery = await query.PopularKeyword(qObj, config);

    const id = config.elastic_id + ":" + config.elastic_pw;
    var authorization = Buffer.from(id, "utf8").toString('base64');
    var url = `${config.elastic_address[config.version]}/${config.keyword_index[config.version]}/_search`;

    // console.log(JSON.stringify(stringquery));
    console.log(url);

    //elasticsearch 검색
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
            var result = response.data.aggregations.stations.buckets;
            console.log('result',result);
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json; charset=UTF-8");
            res.send(JSON.stringify(result));
        }).catch(error => {
            throw new Error(error);
        });

}

module.exports = {
    InsertKeyword,
    PopularSearch,
    auto,
};