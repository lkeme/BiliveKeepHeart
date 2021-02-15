<p align="center">
<img src="https://i0.hdslb.com/bfs/archive/e62b6b095ef38dfb742687f11e4b570dde420b5d.png" width="300">
</p>

<h3 align="center">BiliBili Heartbeat Server</h3>

## Introduction

null    

## Demo
![](https://i.loli.net/2020/07/22/AMqcRxy4K2wmDJr.png)

## Example OR Documentation
[Example](./example.py) OR [Documentation](https://mudew.com/20200722/bilibili-webside-live-broadcast-encryption-heartbeat-request-analysis/)


## Quick Start

1. Clone or [download](https://github.com/lkeme/bilibili-pcheartbeat) this repository

2. Install [CN-Nodejs](http://nodejs.cn/) or [EN-Nodejs](https://nodejs.org/en/)

3. Use npm to install packages

```
> npm install
```

4. Start-up

```
default port 3000
> node app.js 

custom port 1-65535
> node app.js -p 5200
> node app.js --port 5201
```

## API

Use POST method to access API, and the return data is in JSON format

### /enc

### Url
```
http://127.0.0.1:3000/enc
```

### Headers
- Content-type: application/json

#### Param
```json
{
    "t": {
        "id": [1, 199, 0, 123456],
        "device": "[\"device\",\"device\"]",
        "ets": "ets",
        "benchmark": "secret_key",
        "time": "heartbeat_interval",
        "ts": "ts",
        "ua": "ua"
    },
    "r": [2, 5, 1, 4]
}
```

#### Return

- Success

```json
{"s": "be02e0ac4248ff3e59bea681258319bec489db3b5766eb0d40ce25516889c6df2bb8383c16d8a9bbb3ced7283388fb4df89718430064564bfaf6be246b983910"} 
```
- Error 1

```json
{"code": -1, "msg": "405 Method Not Allowed"}
```
- Error 2

```json
{"s": "404ed600e83797c90f691afe68123427af0e2cdee9fd7644c93bb8ab533cc69dd4115e1ef61f93154487523e053af82ead334360109cad4eeea813d3d5bbc404"} 
```

## Disclaimer

The project is for study and technical communication only, do not use it for illegal purposes!

I don"t take any responsibility if legal dispute occurs.

## License
GPL v3
