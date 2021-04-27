async function MsearchConvert(data, res,qObj,config) {
    // console.log(JSON.stringify(data),"-----------------data");
    var result = {};
    // result.class = "approval";
    var response = data.responses;
    // console.log(response);
    var dataquery = {};
    var keywordIndex = 0;
    for (var i = 0; i < response.length; i++) {
        var resdata = response[i].hits;
        // console.log(resdata,"resdata");
        if(response[i].aggregations){
            keywordIndex = i;
            break;
        }
        var d = [];
        if (resdata.hits.length > 0) {
            // console.log(resdata.hits,"----------");
            for (var j = 0; j < resdata.hits.length; j++) {
                // console.log(resd.category,"category");

                    var resd = resdata.hits[j]['_source'];
                    
                    d.push(resd);

                // console.log('for문 성공적',j);
            }
            var category = resdata.hits[0]['_source'].category;
            var total_cnt = 0;
            if(config.version === "v6"){
                total_cnt = resdata.total;
            }else if(config.version === "v7"){
                total_cnt = resdata.total.value;
            }
            var categorydata = {};
            categorydata.total_cnt = total_cnt;
            categorydata.data = d;
            // console.log(categorydata);
            dataquery[category] = categorydata;
        }
        // result.data = dataquery;
    }
    result.data = dataquery;
    // console.log(dataquery,"dataquery");
    for (var i = keywordIndex; i < response.length; i++) {

    }
    result.popular = response[keywordIndex].aggregations.stations.buckets;
    result.relation = response[keywordIndex+1].aggregations.stations.buckets;
    // console.log(JSON.stringify(result));
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json; charset=UTF-8");
    res.send(JSON.stringify(result));
}

module.exports = {
    MsearchConvert,
};