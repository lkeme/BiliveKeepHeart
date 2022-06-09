<p align="center">

[comment]: <> (https://www.biliplus.com/task/banner_fetch/)

<img src="http://i0.hdslb.com/bfs/feed-admin/10641bbc5189591221c00958f3458f33798c7caa.png" width="300">

[comment]: <> (<img src="https://i0.hdslb.com/bfs/archive/eb023708f151543e83afb808294edd5bc5b9fab0.png" width="300">)

[comment]: <> (<img src="https://i0.hdslb.com/bfs/archive/08bf65e3db505390d08c703ba15991441c24c581.png" width="300">)

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

[Example](example/example.py)
OR [Documentation](https://mudew.com/20200722/bilibili-webside-live-broadcast-encryption-heartbeat-request-analysis/)

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

### /enc | /pc_wasm | /pc

### Url

```
http://127.0.0.1:3000/enc
http://127.0.0.1:3000/pc_wasm
http://127.0.0.1:3000/pc
```

### Headers

- Content-type: application/json

#### Param

```json
{
  "t": {
    "id": [
      1,
      199,
      0,
      123456
    ],
    "device": "[\"device\",\"device\"]",
    "ets": "ets",
    "benchmark": "secret_key",
    "time": "heartbeat_interval",
    "ts": "ts",
    "ua": "ua"
  },
  "r": [
    2,
    5,
    1,
    4
  ]
}
```

### /app

### Url

```
http://127.0.0.1:3000/app
```

### Headers

- Content-type: application/json

#### Param

```json
{
  "t": {
    "platform": "android",
    "uuid": "DBA8090A-5775-42E7-9762-10FD2E8447D870399",
    "buvid": "a5067487f9e78bdd25c4356a92ae5e8d",
    "seq_id": "1",
    "room_id": "23058",
    "parent_id": "1",
    "area_id": "34",
    "timestamp": "1595242600",
    "secret_key": "axoaadsffcazxksectbbb",
    "watch_time": "300",
    "up_id": "11153765",
    "up_level": "40",
    "jump_from": "240033",
    "gu_id": "075284f1c7343e6f180ae02a8ee43561",
    "play_type": "1",
    "play_url": "https://d1--cn-gotcha02.bilivideo.com/live-js/883254/live_11153765_9369560_2500.flv?cdn=cn-gotcha02&expires=1595246501&len=0&oi=1032635280&pt=ios&qn=400&trid=f15580399cde4df59bd8b50d68d4a8b4&sigparams=cdn,expires,len,oi,pt,qn,trid&sign=d72637bd518822d6d9d5c65d0ec921a6&ptype=0&src=11&level=1",
    "s_time": "0",
    "data_behavior_id": "",
    "data_source_id": "",
    "up_session": "l:one:live:record:23058:1586762229",
    "visit_id": "44c7215c96e1e403f8c821a1efaac9bf",
    "watch_status": "1",
    "click_id": "BEA91C5F-F0C6-4F4A-AC1E-144BC9CB1CA240968",
    "session_id": "E6D29411-3BB3-4136-98B5-01D585778B8C40970",
    "player_type": "1",
    "client_ts": "1595242900"
  },
  "r": [
    3,
    7,
    2,
    6,
    8
  ]
}
```

#### Return

- Success

```json
{
  "code": 0,
  "s": "b888312f8bf4cfc76a78332e3893a59ffebbfb179510b330fa27f6a2fc022174dbea9a1953dca93048e84ec33d9e550b5b629f2c0d9333e2a57a95ac4cee0a5d",
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

## Docker

```bash
docker stop ${DOCKER_NAME} 2> /dev/null
docker rm ${DOCKER_NAME} 2> /dev/null
docker run -itd --rm --name ${DOCKER_NAME} -p 127.0.0.1:8001:3000 ${DOCKER_IMAGE}
```

## Reference

- [lzghzr](https://github.com/lzghzr)

## Disclaimer

The project is for study and technical communication only, do not use it for illegal purposes!

I don"t take any responsibility if legal dispute occurs.

## License

[GPL v3](https://github.com/lkeme/bilibili-pcheartbeat/blob/master/LICENSE)

Copyright (c) 2018-2021 [bilibili-pcheartbeat](https://github.com/lkeme/bilibili-pcheartbeat).
