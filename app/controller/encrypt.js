const enc = require('../core/enc')
const common = require('../util/common')


const handleGetEncrypt = (request, response) => {
    console.error(`不支持的GET请求方式`);
    // response.setHeader('Content-Type', 'application/json')
    response.status(405).json({
        "code": -1,
        "s": "",
        "message": "HTTP 405 Method Not Allowed"
    })
}


const handlePostEncrypt = (request, response) => {
    // var t = JSON.stringify({
    //     "id":"[1, 34, 1, 23058]",
    //     "device":"[\"e0345df3964d37eb1234562275392dfd\", \"7190a3eb-1234-40c1-1234-3d66bda01d3e\"]",
    //     "ets":1570520821,
    //     "benchmark":"seacasdgyijfhofiuxoannn",
    //     "time":180,
    //     "ts":1570521002259
    // });
    // var r = [2, 5, 1, 4]

    // response.write('you posted:\n')
    // console.debug(request.body);
    // res.send(JSON.stringify({'s': encryptData(common.formatParams(req.body.t), req.body.r)}, null, 2))
    let t = request.body.t
    let r = request.body.r
    // filtering dirty data -> null or undefined or NaN
    if (!r || !t || !t.ets || !t.benchmark || !t.time || t.ets === 'null' || t.benchmark === 'null' || t.time === 'null') {
        console.warn("当前请求数据错误，返回默认值，请检查请求。");
        return response.status(400).json({
            "code": -2,
            "s": "",
            "message": "The request is missing a required parameter.",
        });
    }
    let promise = new Promise(function (resolve, reject) {
        try {
            t = JSON.stringify(common.formatParams(t));
            let s = enc.spyder(t, r);
            resolve(s)
        } catch (err) {
            reject(err);
        }
    });
    return promise.then(
        data => {
            response.json({
                "code": 0,
                "s": data,
                "message": "success"
            })
        }
    ).catch(
        err => {
            response.status(400).json({
                "code": -3,
                "s": "",
                "message": err
            })
        }
    );
}

module.exports = {
    handleGetEncrypt: handleGetEncrypt,
    handlePostEncrypt: handlePostEncrypt,
}
