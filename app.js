const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const enc = require('./enc');

// format
function format_data(data) {
    for (let key in data) {
        if (typeof (data[key]) === 'object') {
            data[key] = JSON.stringify(data[key])
        }
    }
    return data;
}

// enc
function encrypt_data(t, r) {
    // var t = JSON.stringify({
    //     "id": "[1, 34, 1, 23058]",
    //     "device": "[\"e0345df3964d37eb1234562275392dfd\", \"7190a3eb-1234-40c1-1234-3d66bda01d3e\"]",
    //     "ets": 1570520821,
    //     "benchmark": "seacasdgyijfhofiuxoannn",
    //     "time": 180, "ts": 1570521002259
    // });
    // var r = [2, 5, 1, 4]
    t = JSON.stringify(t);
    return enc.spyder(t, r);
}

app.use(bodyParser.json())

// enc post
app.post('/enc', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    // res.write('you posted:\n')
    console.log(req.body);
    res.send(JSON.stringify({
        's': encrypt_data(format_data(req.body.t), req.body.r)
    }, null, 2))
});

// enc get
app.get('/enc', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({
        'code': -1,
        'msg': '405 Method Not Allowed'
    }));
});

app.listen(3000, function () {  // listening
    console.log('server now listening at port 3000');
});

