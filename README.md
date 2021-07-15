<p align="center">
<img src="http://i0.hdslb.com/bfs/feed-admin/10641bbc5189591221c00958f3458f33798c7caa.png" width="300">

[comment]: <> (<img src="https://i0.hdslb.com/bfs/feed-admin/86848c76a76fe46d84d6ef1ab735d9398ed3ee8e.png" width="300">)

[comment]: <> (<img src="https://i0.hdslb.com/bfs/vc/c1e19150b5d1e413958d45e0e62f012e3ee200af.png" width="300">)

[comment]: <> (<img src="https://i0.hdslb.com/bfs/archive/e62b6b095ef38dfb742687f11e4b570dde420b5d.png" width="300">)
</p>

<h3 align="center">Bilibili Heartbeat Server</h3>

## Introduction

[![Stargazers over time](https://starchart.cc/lkeme/bilibili-pcheartbeat.svg)](https://starchart.cc/lkeme/bilibili-pcheartbeat)

## Demo

![](https://i.loli.net/2020/07/22/AMqcRxy4K2wmDJr.png)

## Example OR Documentation

[Example](example/example.py) OR [Documentation](https://mudew.com/20200722/bilibili-webside-live-broadcast-encryption-heartbeat-request-analysis/)

## Quick Start

1. Clone or [download](https://github.com/lkeme/bilibili-pcheartbeat) this repository

2. Install [CN-Nodejs](http://nodejs.cn/) or [EN-Nodejs](https://nodejs.org/en/)

3. Use npm to install packages

```
> npm install
```

4. Start-up

```
# cli
default port 3000
> node app.js 

custom port 1-65535
> node app.js -p 5200
> node app.js --port 5201
```

```
# pm2
cp ecosystem.config.js.example  ecosystem.config.js
npm install -g pm2
pm2 start ecosystem.config.js
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
{
  "code": 0,
  "s": "be02e0ac4248ff3e59bea681258319bec489db3b5766eb0d40ce25516889c6df2bb8383c16d8a9bbb3ced7283388fb4df89718430064564bfaf6be246b983910",
  "message": "success"
}
```

- Error 1

```json
{
  "code": -1,
  "s": "",
  "message": "HTTP 405 Method Not Allowed"
}
```

- Error 2

```json
{
  "code": -2,
  "s": "",
  "message": "The request is missing a required parameter."
}
```

- Error 3

```json
{
"code": -2,
"s": "",
"message": "other errors msg"
}
```

## Disclaimer

The project is for study and technical communication only, do not use it for illegal purposes!

I don"t take any responsibility if legal dispute occurs.

## License

[GPL v3](https://github.com/lkeme/bilibili-pcheartbeat/blob/master/LICENSE)

Copyright (c) 2018-2021 [bilibili-pcheartbeat](https://github.com/lkeme/bilibili-pcheartbeat).
