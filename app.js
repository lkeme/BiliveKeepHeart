const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const enc = require('./enc');
const {program} = require('commander');

// format
function formatData(data) {
    for (let key in data) {
        if (typeof (data[key]) === 'object') {
            data[key] = JSON.stringify(data[key])
        }
    }
    return data;
}

// enc
function encryptData(t, r) {
    // var t = JSON.stringify({
    //     "id": "[1, 34, 1, 23058]",
    //     "device": "[\"e0345df3964d37eb1234562275392dfd\", \"7190a3eb-1234-40c1-1234-3d66bda01d3e\"]",
    //     "ets": 1570520821,
    //     "benchmark": "seacasdgyijfhofiuxoannn",
    //     "time": 180, "ts": 1570521002259
    // });
    // var r = [2, 5, 1, 4]
    if (t.ets === null || t.benchmark === null || t.time === null) {
        //
        return "404ed600e83797c90f691afe68123427af0e2cdee9fd7644c93bb8ab533cc69dd4115e1ef61f93154487523e053af82ead334360109cad4eeea813d3d5bbc404"
    }
    t = JSON.stringify(t);
    // filtering dirty data
    if (r === undefined || r === null || t === undefined || t === null) {
        //
        return "404ed600e83797c90f691afe68123427af0e2cdee9fd7644c93bb8ab533cc69dd4115e1ef61f93154487523e053af82ead334360109cad4eeea813d3d5bbc404"
    }
    return enc.spyder(t, r);
}

// 转换整型
function myParseInt(value, dummyPrevious = 10) {
    // parseInt takes a string and a radix
    const parsedValue = parseInt(value, dummyPrevious);
    if (isNaN(parsedValue)) {
        console.log('The parameter is not a number.')
        process.exit();
    }
    return parsedValue;
}

//解析commandline arguments
function parsePort(defaultPort) {
    program.version('0.0.1');
    program
        .version('0.0.1')
        .usage('[options] [value ...]')
        .option('-p, --port <number>', 'port', myParseInt)
    program.parse(process.argv);
    const options = program.opts();
    if (options.port === undefined) {
        return defaultPort;
    }
    return options.port;
}

// init
app.use(bodyParser.json())

// enc get
app.get('/enc', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({
        'code': -1,
        'msg': '405 Method Not Allowed'
    }));
});

// enc post
app.post('/enc', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    // res.write('you posted:\n')
    console.log(req.body);
    res.send(JSON.stringify({
        's': encryptData(formatData(req.body.t), req.body.r)
    }, null, 2))
});

// start api server
const port = parsePort(3000)
app.listen(port, function () {
    console.log(`server now listening at port ${port}`);
});

