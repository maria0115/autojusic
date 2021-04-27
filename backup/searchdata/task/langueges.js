var config = require("../config.json");
const util = require("../lib/util.js");
const logger = require("../lib/log.js");
const axios = require("axios");
const cookie = require('cookie');

function convert(config, qObj, res, es_res) {
    // console.log(es_res.data,"결과값");
    console.log("qObj",qObj);
    const esData = es_res.data;
    // console.log(esData.searchresult);
    var ret = {};
    for(var i=0; i<esData.length; i++){
        ret[esData[i].id] = esData[i].text;
    }
    // for(var i =0;i<es)
    res.setHeader("Content-type", "application/json; charset=UTF-8");
    ret.searchresult = ret.searchresult.replace(/@/,qObj.searchword);
    ret.searchresult = ret.searchresult.replace(/#/,qObj.total_cnt);
    res.end(JSON.stringify(ret));
    
    console.log(JSON.stringify(ret));
    return ret;
}

var ret = {};
async function getlangueges(config, qObj, res,req) {
    console.log('--------------')
    console.log(qObj);
    // var url = `${config.languages}?category=${qObj.locale}`;
    // console.log(url);
    ret={};

    console.log(ret);
    // // console.log('cookie',req.headers.cookie);
    const languages = require('../language.json');
    const uselanguages = languages;
    console.log(uselanguages,"uselanguagesjson파일");
    languages.ko.searchresult = "검색어 <span class='highlight'>&quot;@&quot;</span>에 대한 <span class='highlight'>#</span>건의 검색 결과입니다.";
    languages.en.searchresult = "Here are <span class='highlight'>#</span> results for the search term <span class='highlight'>&quot;@&quot;</span>.";
    // await axios({
    //     method: 'get',
    //     url: url,
    //     // headers: {
    //     //     Authorization: 'Basic ' + authorization,
    //     //     'Content-Type': 'application/json'
    //     // }
    // })
    //     .then((response) => {
    //         console.log('잘왔다');
    //         convert(config, qObj, res, response);
    //         console.log('여기다');
    //     }).catch(error => {
    //         throw new Error(error);
    //     });
    // return data;

    // ret = languages[];
    console.log(qObj.locale,"locale");
    var lang = '';
    if(qObj.locale===""){
        console.log(cookie.parse(qObj.cookie).language,"cookie 없음");
        ret = uselanguages[cookie.parse(qObj.cookie).language];
        // console.log(ret);
    }else{
        
        ret = uselanguages[qObj.locale];
        // console.log(ret);
    }
    console.log(qObj,"********************");
    console.log(ret);

    // res.setHeader("Content-type", "application/json; charset=UTF-8");
    // ret.searchresult = ret.searchresult.replace(/@/,qObj.searchword);
    // ret.searchresult = ret.searchresult.replace(/#/,qObj.total_cnt);
    // console.log(ret.searchresult,qObj);
    // res.end(JSON.stringify(ret));
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json; charset=UTF-8");
    ret.searchresult = ret.searchresult.replace(/@/,qObj.searchword);
    ret.searchresult = ret.searchresult.replace(/#/,qObj.total_cnt);
    res.send(JSON.stringify(ret));
    return ret;
};

module.exports = {
    getlangueges,
}