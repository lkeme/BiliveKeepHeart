const wasm = require('../core/wasm/wasm')
const common = require('../util/common')
const pc = require("../core/pc/pc");
const app = require("../core/app/app");

const handleAppEncrypt = (request, response) => {
    let t = request.body.t
    let r = request.body.r
    r = r instanceof Object ? r : JSON.parse(r)
    //
    let promise = new Promise(function (resolve, reject) {
        try {
            t = JSON.stringify(common.formatParams(t));
            let s = app.spyder(t, r);
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


const handlePcEncrypt = (request, response) => {
    let t = request.body.t
    let r = request.body.r
    r = r instanceof Object ? r : JSON.parse(r)

    if (!filterPcParams(t, r)) {
        console.warn("当前请求数据错误，返回默认值，请检查请求。");
        return response.status(400).json({
            "code": -2,
            "s": "",
            "message": "The request is missing a required parameter.",
        });
    }
    // 额外处理
    let [parent_id, area_id, seq_id, room_id] = t.id instanceof Object ? t.id : JSON.parse(t.id);
    let [buvid, uuid] = t.device instanceof Object ? t.device : JSON.parse(t.device);
    let key = t.benchmark;
    let newData = {
        platform: 'web',
        parent_id,
        area_id,
        seq_id,
        room_id,
        buvid,
        uuid,
        ets: t.ets,
        time: t.time,
        ts: t.ts,
    };
    //
    let promise = new Promise(function (resolve, reject) {
        try {
            t = JSON.stringify(common.formatParams(newData));
            let s = pc.spyder(t, r, key);
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

const filterPcParams = function (t, r) {
    // var t = JSON.stringify({
    //     "id":"[1, 34, 1, 23058]",
    //     "device":"[\"e0345df3964d37eb1234562275392dfd\", \"7190a3eb-1234-40c1-1234-3d66bda01d3e\"]",
    //     "ets":1570520821,
    //     "benchmark":"seacasdgyijfhofiuxoannn",
    //     "time":180,
    //     "ts":1570521002259
    // });
    // var r = [2, 5, 1, 4]
    // filtering dirty data -> null or undefined or NaN
    if (!r || !t || !t.ets || !t.benchmark || !t.time || t.ets === 'null' || t.benchmark === 'null' || t.time === 'null') {
        console.warn("当前请求数据错误，返回默认值，请检查请求。");
        return false
    }
    return true
}

const handleWasmEncrypt = (request, response) => {
    // response.write('you posted:\n')
    // console.debug(request.body);
    // res.send(JSON.stringify({'s': encryptData(common.formatParams(req.body.t), req.body.r)}, null, 2))
    let t = request.body.t
    let r = request.body.r
    r = r instanceof Object ? r : JSON.parse(r)

    // filtering dirty data -> null or undefined or NaN
    if (!filterPcParams(t, r)) {
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
            let s = wasm.spyder(t, r);
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
    handleWasmEncrypt: handleWasmEncrypt,
    handlePcEncrypt: handlePcEncrypt,
    handleAppEncrypt: handleAppEncrypt,
}
