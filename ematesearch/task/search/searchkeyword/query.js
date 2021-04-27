
async function AutoKeyword(qObj, config) {
    // aggs
    var aggs = {
        "stations": {
            "terms": {
                "field": "keyword",
                "order": {
                    "max_score": "desc"
                }
            },
            "aggs": {
                "max_score": {
                    "max": {
                        "script": {
                            "source": "_score"
                        }
                    }
                }
            }
        }
    };
    var size = 0;
    var query = {
        "multi_match": {
            "query": qObj.searchword,
            "fields": "keyword.search",
            "type": "phrase",
            "operator": "and"

        }
    }
    var result ={};
    result.size = size;
    result.aggs = aggs;
    result.query = query;
    return result;

}
async function PopularKeyword(qObj, config) {
    // console.log("Popular",qObj);
    var query = {};
    query.size = 0;
    var aggs = {};
    var terms = {};
    terms.field = "keyword";
    var stations = {};
    stations.terms = terms;
    aggs.stations = stations;
    query.aggs = aggs;
    var squery = {};
    var range = {};
    if (qObj.relation !== "relation") {
        var created = {};
        created.gte = qObj.kgte;
        created.lt = qObj.klt;
        created.format = "yyyyMMddHHmmss";
        range.created = created;
    }
    squery.range = range;
    query.query = squery;
    return query;
}
async function RealationKeyword(qObj, config) {
    if (qObj.searchwordarr.length === 0) {
        var query = {};
        var match = {};
        match.keyword = "";
        query.match = match;
        var q = await PopularKeyword(qObj, config);
        q.query = query;
        return q;
    }
    var should = [];
    for (var j = 0; j < qObj.searchwordarr.length; j++) {
        var searchwordarr = qObj.searchwordarr[j].split(' ');
        for (var i = 0; i < searchwordarr.length; i++) {
            // if(searchwordarr[i]!==""){
            var multimatch = {};
            multimatch.query = searchwordarr[i];
            multimatch.fields = "keyword.search";
            multimatch.type = "phrase";
            multimatch.operator = "or";
            var mmatch = {};
            mmatch['multi_match'] = multimatch;
            should.push(mmatch);
            // }
        }
    }
    var bool = {};
    bool.should = should;
    var must = {};
    must.bool = bool;

    var bigbool = {};
    bigbool.must = must;
    var query = {};
    query.bool = bigbool;

    qObj.relation = "relation";

    var q = await PopularKeyword(qObj, config);
    q.query = query;
    return q;

}

async function InsertKeywordQuery(qObj, config) {
    var stringquery = '';
    var index = {};
    var indexquery = {};
    indexquery['_index'] = config.keyword_index[config.version];
    indexquery['_type'] = "_doc";
    indexquery['_id'] = `k${Math.floor(Math.random() * Math.random() * 1000000000000000)}`
    // console.log(indexquery['_id'],"indexquery['_id']");
    index.index = indexquery;
    var query = {};
    query.keyword = qObj.searchwordarr;
    query.created = qObj.created;

    stringquery += JSON.stringify(index) + "\n";
    stringquery += JSON.stringify(query) + "\n";
    // console.log(stringquery, "insertstringquery");
    return stringquery;
}

module.exports = {
    PopularKeyword,
    InsertKeywordQuery,
    RealationKeyword,
    AutoKeyword,
};