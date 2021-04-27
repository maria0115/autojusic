const { default: axios } = require('axios');
var config = require("../config.json");
require('date-utils');

async function test(config, qObj, res, req) {
    console.log('testhi');
    // //입력
    // var insertdate = await InsertDate();
    // console.log(insertdate, "반황받은 insertdate");
    qObj.class = "all";
    qObj.aOrd = "desc";
    qObj.accOrrec = "created";
    qObj.fieldname = "all";
    qObj.gte = "now-7d/d";
    qObj.pagenum = 0;
    qObj.searchword = "김선호";
    qObj.searchwordarr = [];
    qObj.size = 5;
    qObj.utc = "-540"
    qObj.dateType = "season";

    //elasticsearch
    const id = config.elastic_id + ":" + config.elastic_pw;
    var authorization = Buffer.from(id, "utf8").toString('base64');
    var url = `${config.elastic_address[config.version]}/${config.default_index}/`;
    //msearch
    var stringquery = "";
    var functionName = "";
    if (qObj.class === "all") {
        stringquery = await MsearchQuery(qObj);
        functionName = "MsearchConvert";
        url += "_msearch";
    } else {
        stringquery = await SearchQuery(qObj);
        console.log(JSON.stringify(stringquery));
        functionName = "SearchConvert";
        url += "_search";
    }
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
            eval(functionName + '(data, res,qObj)');
        }).catch(error => {
            throw new Error(error);
        });
};

function SearchConvert(data, res, qObj) {
    var result = {};
    // console.log('searchconvert', data);
    var d = [];
    var resultdata = data.hits;
    // console.log(resultdata);
    if (resultdata.total > 0) {
        for (var i = 0; i < resultdata.hits.length; i++) {
            var resdata = resultdata[i]['_source']
            d.push(resdata);
        }

        var category = {};
        category.total_cnt = resultdata.total;
        category.data = d;
        result[qObj.class] = category;
    }
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json; charset=UTF-8");
    res.send(JSON.stringify(result));
}

function MsearchConvert(data, res, qObj) {
    console.log(data);
    var result = {};
    // result.class = "approval";
    var response = data.responses;
    var dataquery = {};
    for (var i = 0; i < response.length; i++) {
        var resdata = response[i].hits;
        // console.log(resdata,"resdata");
        var d = [];
        if (resdata.hits.length > 0) {
            for (var j = 0; j < resdata.hits.length; j++) {
                var resd = resdata.hits[j]['_source']
                d.push(resd);
            }
            var category = resdata.hits[0]['_source'].category;
            var total_cnt = resdata.total;
            var categorydata = {};
            categorydata.total_cnt = total_cnt;
            categorydata.data = d;
            // console.log(categorydata);
            dataquery[category] = categorydata;

        }
        // result.data = dataquery;
    }
    console.log(dataquery);

    res.statusCode = 200;
    res.setHeader("Content-type", "application/json; charset=UTF-8");
    res.send(JSON.stringify(dataquery));

}

async function SearchQuery(qObj) {
    var result = await Query(qObj);
    return result;
}

async function Query(qObj) {
    console.log(qObj);
    var esquery = {};
    console.log(qObj);
    if (qObj.searchwordarr.length > 0) {
        for (var i = 0; i < qObj.searchwordarr.length; i++) {
            qObj.searchword += ` ${qObj.searchwordarr[i]}`;
        }
    }
    console.log(qObj.searchword);
    var query = {};
    if (qObj.searchword !== '') {
        var smallquery = {};
        smallquery.query = qObj.searchword;
        smallquery.operator = "AND";

        var bool = {};
        var should = [];
        if (qObj.fieldname !== 'all') {
            var match = {};
            var smallmatch = {};
            smallmatch[`${qObj.fieldname}.search`] = smallquery;
            match.match = smallmatch;
            should.push(match);
        } else {
            for (var i = 0; i < config.default_field.length; i++) {
                var match = {};
                var smallmatch = {};
                console.log(config.default_field[i]);
                const field = config.default_field[i];
                smallmatch[`${field}.search`] = smallquery;
                match.match = smallmatch;
                // console.log(match);
                should.push(match);
                // console.log(should);
            }
            // console.log(should);
        }
        var filter = [];
        var smallq = {};
        var categ = qObj.class;
        smallq.category = categ;
        var smallm = {};
        smallm.match = smallq;
        filter.push(smallm);
        // console.log(q.query.bool)
        const utc = UtcDate(qObj.utc);
        var lt='';
        var gte = "";
        var format = "";
        if(qObj.dateType === "season" || qObj.dateType === "ago"){
            gte = qObj.gte;
            lt = "now";
        }else if(qObj.dateType === "custom"){
            gte = qObj.gte[0];
            lt = qObj.gte[1];
            format = "yyyyMMdd";
        }
        var createdate = {};
        createdate.lt = lt;
        createdate.gte = gte;
        createdate['time_zone'] = utc;
        var range = {};
        range.created = createdate;
        var rangefilter = {};
        rangefilter.range = range;
        filter.push(rangefilter);

        bool.filter = filter;
        bool.should = should;
        query.bool = bool;
        esquery.query = query;
    } else {
        esquery.query = { "match_all": {} };
        if (qObj.fieldname !== '') {
            esquery["_source"] = qObj.fieldname;
        }
    }
    esquery.size = qObj.size;
    esquery.from = qObj.pagenum;
    var sortfield = {};
    sortfield.order = qObj.aOrd;
    var sort = {};
    sort[qObj.accOrrec] = sortfield;
    esquery.sort = sort;
    console.log(JSON.stringify(esquery), "esquery");
    return esquery;
}

async function MsearchQuery(qObj) {

    console.log("MsearchQuery로옴");
    var index = {};
    index.index = config.default_index;
    // console.log(index);
    var stringquery = '';
    var category = config.default_category;
    var q = await Query(qObj);
    // console.log(JSON.stringify(q), "q");
    // console.log(category[2], "length");
    for (var i = 0; i < category.length; i++) {
        var query = {};

        var smallquery = {};
        var categ = category[i];
        smallquery.category = categ;
        var smallmatch = {};
        smallmatch.match = smallquery;
        // console.log(q.query.bool)
        q.query.bool.filter[0] = smallmatch;
        query[i] = q;

        stringquery += JSON.stringify(index) + "\n";
        stringquery += JSON.stringify(query[i]) + "\n";
        // console.log(stringquery, 'stringquery');
    }

    console.log(stringquery);
    return stringquery;
}

function UtcDate(utc) {

    var date = '';
    if (utc >= 0) {
        var utctime = new Date((utc));
        date = utctime.toFormat('-HH:MI');
    } else {
        var utctime = new Date((utc * -1));
        date = utctime.toFormat('+HH:MI');
    }

    return date;

}

function SendDate(string) {
    var strArray = string.split('T');
    var year = strArray[0].substr(0, 4);
    var month = strArray[0].substr(4, 2);
    var day = strArray[0].substr(6, 2);
    var hour = strArray[1].substr(0, 2);
    var minute = strArray[1].substr(2, 2);
    var second = strArray[1].substr(4, 2);

    var utctime = strArray[1].substring(6);
    // console.log(utctime);
    // console.log(year, month, day, hour, minute, second);

    var date = new Date(year, month - 1, day, hour, minute, second);

    var utchour = parseInt(utctime.substr(1, 2));
    var utcminutes = parseInt(utctime.substr(4, 2));
    var utcplma = utctime.substr(0, 1);
    var utcdate = new Date(0, 0, 0, utchour, utcminutes);
    // console.log(utcdate.toFormat('HH:MI'));

    // console.log(utchour,utcminutes,utcplma);
    if (utcplma === '+') {
        date.setHours(date.getHours() + utchour);
        date.setMinutes(date.getMinutes() + utcminutes);
    } else if (utcplma === '-') {
        date.setHours(date.getHours() - utchour);
        date.setMinutes(date.getMinutes() + utcminutes);
    }

    // console.log(date.toLocaleString());
    senddate = date.toLocaleString();
    return senddate;
}

async function InsertDate() {
    var date = new Date();
    // var localdate = date.toFormat('YYYYMMDDTHHMISS');

    // console.log('localdate',localdate);

    var utcyear = date.getUTCFullYear();   //year
    var utcmounth = date.getUTCMonth();  //mouth
    var utcday = date.getUTCDate();        //day
    var utchour = date.getUTCHours();      //hours
    var utcminute = date.getUTCMinutes();  //minutes
    var utcsecond = date.getUTCSeconds();  //second
    // console.log('getutc',utcyear,utcmounth,utcday,utchour,utcminute,utcsecond);

    var idate = new Date(utcyear, utcmounth, utcday, utchour, utcminute, utcsecond);
    var insertdate = idate.toFormat('YYYYMMDDTHHMISS');
    // console.log(typeof insertdate);

    var timezone = date.getTimezoneOffset();
    var utc = '';
    if (timezone >= 0) {
        var utctime = new Date((timezone));
        utc = utctime.toFormat('-HH:MI');
    } else {
        var utctime = new Date((timezone * -1));
        utc = utctime.toFormat('+HH:MI');
    }

    insertdate = insertdate + utc;
    return insertdate;

}

module.exports = {
    test,
}