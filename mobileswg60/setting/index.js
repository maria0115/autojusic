const axios = require("axios");

async function pupdate(config, qObj, res, req) {
    const url = `${config.elastic_address[config.version]}/${config.default_index[config.version]}/_update/${qObj.uid}`;
    var query = `{
        "doc":${JSON.stringify(qObj.setting)}
    }`;
    const id = config.elastic_id + ":" + config.elastic_pw;
    var authorization = Buffer.from(id, "utf8").toString('base64');

    await axios({
        method: 'post',
        url: url,
        data: query,
        headers: {
            Authorization: 'Basic ' + authorization,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            var data = response.data;
            // console.log('data시작');
            re = data["_shards"].successful;
            if (re === 1) {
                // 여기다가는 바로 데이터 값 돌려주기
                result = { successful: true }

            } else if (re === 0) {
                result = { successful: false }
            }
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json; charset=UTF-8");
            res.send(JSON.stringify(result));
            return

            //data 구조 변환

        }).catch(error => {
            throw new Error(error);
        });

}
async function psearch(config, qObj, res, req) {
    var url = `${config.elastic_address[config.version]}/${config.default_index[config.version]}/_search`;
    var query = {
        query: {
            match: {
                _id: qObj.uid
            }
        }
    };
    const id = config.elastic_id + ":" + config.elastic_pw;
    var authorization = Buffer.from(id, "utf8").toString('base64');
    var re = 0;

    await axios({
        method: 'post',
        url: url,
        data: JSON.stringify(query),
        headers: {
            Authorization: 'Basic ' + authorization,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            var data = response.data;
            // console.log('data시작');
            re = data.hits.total.value;
            if (re !== 0) {
                // 여기다가는 바로 데이터 값 돌려주기
                res.statusCode = 200;
                res.setHeader("Content-type", "application/json; charset=UTF-8");
                res.send(JSON.stringify(data.hits.hits[0]["_source"]));
                return
            }

            //data 구조 변환

        }).catch(error => {
            throw new Error(error);
        });
    if (re !== 0) {
        return
    }

    

    if (re === 0) {
        var url = `${config.elastic_address[config.version]}/${config.default_index[config.version]}/_doc/${qObj.uid}`;

        await axios({
            method: 'post',
            url: url,
            data: JSON.stringify(config.preferences),
            headers: {
                Authorization: 'Basic ' + authorization,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                var data = response.data;
                if (data.result === "created") {
                    console.log("디폴트값 생성완료");
                    res.statusCode = 200;
                    res.setHeader("Content-type", "application/json; charset=UTF-8");
                    res.send(JSON.stringify(config.preferences));
                    return
                }

                //data 구조 변환

            }).catch(error => {
                throw new Error(error);
            });



    }

};

module.exports = {
    psearch,
    pupdate
};