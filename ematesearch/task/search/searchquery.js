const config = require("../../config/key.js");
const searchKeywordQuery = require('./searchkeyword/query.js');
// use new Date
require('date-utils');

// _msearch
async function MsearchQuery(qObj) {
    console.log("MsearchQuery 여기로 왔다")
    var index = {};
    // ex){"index":"search"}
    index.index = config.default_index[config.version];

    // ex) {"query":{"bool":{"filter":[{"match":{"category":"dept"}},{"range":{"created":
    // {"gte":"now-7d/d","lt":"now","time_zone":"+09:00"}}}],"must":[{"match":{"subject.search":
    // {"query":"김선호","operator":"AND"}}},{"match":{"body.search":{"query":"김선호",
    // "operator":"AND"}}},{"match":{"author.search":{"query":"김선호","operator":"AND"}}}]}},
    // "size":5,"from":0,"sort":{"created":{"order":"desc"}}}
    var q = await Query(qObj);
    var stringquery = '';

    if (qObj.class === 'allsearch') {
        var category = config.default_category;
    } else {
        var category = [];
        category.push(qObj.class);
    }
    for (var i = 0; i < category.length; i++) {
        var query = {};
        var smallquery = {};
        var categ = category[i];
        smallquery.category = categ;
        var smallmatch = {};
        smallmatch.match = smallquery;
        q.query.bool.filter[0] = smallmatch;
        query[i] = q;

        stringquery += JSON.stringify(index) + "\n";
        stringquery += JSON.stringify(query[i]) + "\n";
    }
    //인기검색어
    const keywordquery = await searchKeywordQuery.PopularKeyword(qObj, config);
    var keywordindex = {};
    keywordindex.index = config.keyword_index[config.version];
    stringquery += JSON.stringify(keywordindex) + "\n";
    stringquery += JSON.stringify(keywordquery) + "\n";

    var RealationKeyword = await searchKeywordQuery.RealationKeyword(qObj, config);
    stringquery += JSON.stringify(keywordindex) + "\n";
    stringquery += JSON.stringify(RealationKeyword) + "\n";

    return stringquery;
}
async function Query(qObj) {
    //console.log(qObj);
    var esquery = {};
    var query = {};
    if (qObj.searchword !== '') {
        var bool = {};
        var filter = [];
        var smallq = {};
        var categ = qObj.class;
        smallq.category = categ;
        var smallm = {};
        smallm.match = smallq;
        filter.push(smallm);
        // console.log(q.query.bool)
        if (qObj.gte !== "default") {
            // const utc = UtcDate(qObj.utc);
            var createdate = {};
            createdate.format = "yyyyMMddHHmmss";
            createdate.lt = qObj.lt;
            createdate.gte = qObj.gte;
            // createdate['time_zone'] = utc;
            var range = {};
            range.created = createdate;
            var rangefilter = {};
            rangefilter.range = range;
            filter.push(rangefilter);
        }
        bool.filter = filter;
        var must = [];
        var fields = [];
        if (qObj.fieldname !== 'all') {
            fields.push(`${qObj.fieldname}.search`);
        } else {
            for (var i = 0; i < config.default_field.length; i++) {
                const field = config.default_field[i];
                if(field === "subject"){
                    fields.push(`${field}.search^3`);
                }else{
                    fields.push(`${field}.search`);
                }
            }
        }
        console.log("********************");
        for (var i = 0; i < qObj.searchwordarr.length; i++) {
            if (qObj.searchwordarr[i] !== "" || qObj.searchwordarr[i] !== " ") {
                var searcharr = qObj.searchwordarr[i].split(" ");
                var should = [];
                for (var j = 0; j < searcharr.length; j++) {
                    var mustquery = {};
                    mustquery.operator = "OR";
                    mustquery.fields = fields;
                    // if (searcharr.length > 1 ) {
                    //     mustquery.type = "phrase";
                    //     // console.log('*******************왜 best_fields로오냐');
                    // } else {
                    //     mustquery.type = "best_fields";
                    //     if(i===0){
                    mustquery.type = "phrase";
                    //     }
                    //     // console.log('*****************왜 phrase로오냐');
                    // }
                    mustquery.query = searcharr[j];
                    var mustmultimatch = {};
                    mustmultimatch['multi_match'] = mustquery;
                    // console.log(mustmultimatch, "mustmultimatch");
                    should.push(mustmultimatch);
                    // console.log(should, "should");
                    var shouldinmust = {};
                    shouldinmust.should = should;
                    var mustbool = {};
                    mustbool.bool = shouldinmust;
                }
                must.push(mustbool);
            }
        }
        // qObj.readers = ["CN=SAEROM/O=SIService"];
        // qObj.readers.push('CN=SAEROM/O=SIService');

        var readers = {};
        readers['$readers'] = qObj.readers;

        var mustterms = {};
        mustterms.terms = readers;
        must.push(mustterms);

        bool.must = must;
        query.bool = bool;
        esquery.query = query;
    } else {
        esquery.query = { "match_all": {} };
        if (qObj.fieldname !== '') {
            esquery["_source"] = qObj.fieldname;
        }
    }
    if (qObj.aOrd === "desc") {
        var createdfield = {};
        createdfield.order = "desc";
        var scorefield = {};
        scorefield.order = "desc";
        var sort = {};
        sort["created"] = createdfield;
        sort['_score'] = scorefield;
        esquery.sort = sort;
    }
    esquery['track_total_hits'] = true;
    esquery.size = qObj.size;
    esquery.from = qObj.pagenum;
    // console.log(JSON.stringify(esquery), "esquery");
    return esquery;
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

module.exports = {
    MsearchQuery,
};