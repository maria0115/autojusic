var config = require("../config.json");
const util = require("../lib/util.js");
const logger = require("../lib/log.js");
const axios = require("axios");

async function search(config, qObj, res, req) {
    const id = config.elastic_id + ":" + config.elastic_pw;
    console.log('넘어온값');
    var authorization = Buffer.from(id, "utf8").toString('base64');

    console.log(authorization);
    console.log('--------------')

    var esquery = {
        // "query": {
        //     "match": {
        //         "*": "hi"
        //     }
        // },
    }
    console.log('************************************************');
    console.log(qObj);
    if (qObj.searchwordarr.length > 0) {
        for (var i = 0; i < qObj.searchwordarr.length; i++) {
            qObj.searchword += ` ${qObj.searchwordarr[i]}`;
        }
    }
    console.log(qObj.searchword);
    var query = {};
    var match = {};
    if (qObj.searchword !== '') {
        var smallquery = {};
        smallquery.query = qObj.searchword;
        smallquery.operator = "AND";
        if (qObj.fieldname !== '') {
            match[qObj.fieldname] = smallquery;
            query.match = match;
            esquery.query = query;

        } else {
            var should = [];
            var bool = {};
            should = [
                { "match": { "_vc_wviwlist30__subject": smallquery } },
                { "match": { "body": smallquery } },
                { "match": { "_vc_wviwlist30__author": smallquery } },
                { "match": { "_filepath": smallquery } },
            ]

            bool.should = should;
            query.bool = bool;
            esquery.query = query;
        }
    } else {
        esquery.query = { "match_all": {} };
        if (qObj.fieldname !== '') {
            esquery["_source"] = qObj.fieldname;
        }
    }
    esquery.size = qObj.size;
    esquery.from = qObj.pagenum;
    var sortfield = {};
    sortfield.order = "desc";
    var sort = {};
    sort[qObj.accOrrec + ".keyword"] = sortfield;
    esquery.sort = sort;

    console.log(JSON.stringify(esquery));
    var url = `${config.elastic_address}/${qObj.index}/_search`;
    console.log(url);
    await axios({
        method: 'post',
        url: url,
        data: JSON.stringify(esquery),
        headers: {
            Authorization: 'Basic ' + authorization,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log(response.data);
            console.log('searchdata잘왔다');
            convert(config, qObj, res, response);
        }).catch(error => {
            // console.log(error);
            throw new Error(error);
        });
};
function convert(config, qObj, res, es_res) {
    // console.log(es_res);
    const esData = es_res.data;
    var ret = {};
    ret.total_cnt = esData.hits.total;
    // util.writeSuccess(ret, res);
    const hits = esData.hits.hits;
    const arr = [];
    for (var i = 0; i < hits.length; i++) {
        var obj = {};
        obj.subject = hits[i]["_source"].subject;
        obj.from = hits[i]["_source"].inetfrom;
        obj.created = hits[i]["_source"]._created;
        obj.body = hits[i]["_source"].body;
        arr.push(obj);
    }
    var category = {};
    category.approval = arr;
    ret.category = category;
    res.statusCode = 200;
    console.log(ret);
    res.setHeader("Content-type", "application/json; charset=UTF-8");
    res.end(JSON.stringify(ret));
    return ret;
}

async function create(config, qObj, res, req) {
    //http://125.7.235.202:19200/approval/_search?q=subject:%EC%95%BC%EA%B7%BC
    const id = config.elastic_id + ":" + config.elastic_pw;
    console.log('넘어온값');
    var authorization = Buffer.from(id, "utf8").toString('base64');
    console.log(authorization);
    console.log('--------------')
    console.log(qObj);
    const params = new URLSearchParams();
    if (qObj !== null || Object.keys(qObj).length > 0) {
        for (var key in qObj) {
            if (key !== 'category') {
                params.append(key, qObj[key]);
            }
        }
    }
    const data = {};
    for (var key in qObj) {
        data[key] = qObj[key];
    }
    var url = `${config.elastic_address}/${qObj.category}/_search?${params.toString()}`;
    console.log(url);
    await axios({
        method: 'post',
        url: url,
        headers: {
            Authorization: 'Basic ' + authorization,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log('잘왔다');
            convert(config, qObj, res, response);
            console.log('여기다');
        }).catch(error => {
            throw new Error(error);
        });
    return data;
};

module.exports = {
    search,
    create,
};