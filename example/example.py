#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
- author: Lkeme
- contact: Useri@live.cn
- file: app
- time: 2019/10/4 7:28
- desc: 
"""
import requests
import time
import re

try:
    from urllib import urlencode
except:
    from urllib.parse import urlencode
from requests.packages.urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)


def printer(info, *args):
    at_now = int(time.time())
    time_arr = time.localtime(at_now)
    format_time = time.strftime("%Y-%m-%d %H:%M:%S", time_arr)
    # flag = "," if len(args) else " "
    content = f'[{format_time}] {info} {" ".join(f"{str(arg)}" for arg in args)}'
    print(content)


def format_time():
    return f"[{str(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())))}]"


def match_csrf(cookie):
    temp = re.search(r"bili_jct=(.{32})", cookie)
    csrf = str(temp.group(1))
    return csrf


# 心跳E
def heart_beat_e(room_id=23058):
    url = 'https://live-trace.bilibili.com/xlive/data-interface/v1/x25Kn/E'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://live.bilibili.com',
        'Referer': f'https://live.bilibili.com/{room_id}',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
        'Cookie': cookie,
    }
    payload = {
        'id': [1, 34, 0, 23058],
        'device': '["c4ca4238a0b923820dcc509a6f75849b","55e2620e-a2b9-4086-bd9a-bc399ba13480"]',
        'ts': int(time.time()) * 1000,
        'is_patch': 0,
        'heart_beat': [],
        'ua': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
        'csrf_token': match_csrf(cookie),
        'csrf': match_csrf(cookie),
        'visit_id': ''
    }
    data = urlencode(payload)
    # {"code":0,"message":"0","ttl":1,"data":{"timestamp":1595342828,"heartbeat_interval":300,"secret_key":"seacasdgyijfhofiuxoannn","secret_rule":[2,5,1,4],"patch_status":2}}
    response = session.post(url, headers=headers, data=data,
                            verify=False).json()
    printer("E心跳", response)
    payload['ets'] = response['data']['timestamp']
    payload['secret_key'] = response['data']['secret_key']
    payload['heartbeat_interval'] = response['data']['heartbeat_interval']
    return payload


# 心跳X
def heart_beat_x(index, payload, room_id=23058):
    url = 'https://live-trace.bilibili.com/xlive/data-interface/v1/x25Kn/X'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://live.bilibili.com',
        'Referer': f'https://live.bilibili.com/{room_id}',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
        'Cookie': cookie,
    }
    s_data = {
        "t": {
            'id': [1, 34, index, 23058],
            "device": payload['device'],  # LIVE_BUVID
            "ets": payload['ets'],
            "benchmark": payload['secret_key'],
            "time": payload['heartbeat_interval'],
            "ts": int(time.time()) * 1000,
            "ua": payload['ua']
        },
        "r": [2, 5, 1, 4]
    }
    t = s_data['t']
    payload = {
        's': generate_s(s_data),
        'id': t['id'],
        'device': t['device'],
        'ets': t['ets'],
        'benchmark': t['benchmark'],
        'time': t['time'],
        'ts': t['ts'],
        "ua": t['ua'],
        'csrf_token': match_csrf(cookie),
        'csrf': match_csrf(cookie),
        'visit_id': '',
    }
    # printer(payload)
    payload = urlencode(payload)
    # {"code":0,"message":"0","ttl":1,"data":{"heartbeat_interval":300,"timestamp":1595346846,"secret_rule":[2,5,1,4],"secret_key":"seacasdgyijfhofiuxoannn"}}
    response = session.post(url, headers=headers, data=payload,
                            verify=False).json()
    printer("X心跳", response)
    return response


# 加密s
def generate_s(data):
    url = 'http://127.0.0.1:3000/enc'
    response = requests.post(url, json=data).json()
    printer("S加密", response['s'])
    return response['s']


# 加密s
def generate_s_test():
    url = 'http://127.0.0.1:3000/enc'
    data = {
        "t": {
            "id": [1, 34, 0, 23058],
            "device": [
                "c4ca4238a0b923820dcc509a6f75849b",
                "55e2620e-a2b9-4086-bd9a-bc399ba13480"
            ],
            "ets": 1570562610,
            "benchmark": "seacasdgyijfhofiuxoannn",
            "time": 120,
            "ts": 1570562730734
        },
        "r": [2, 5, 1, 4]
    }
    response = requests.post(url, json=data).json()
    printer("S加密", response)
    return response['s']


# X心跳 {'code': 1012002, 'message': 'bad timestamp request,timestamp:1584604393,watchtime:300,userstatus:1584604393,roomInterval:300,serverTime:1584604393,ispatch:0', 'ttl': 1, 'data': {'heartbeat_interval': 300, 'timestamp': 1584604393, 'secret_rule': [2, 5, 1, 4], 'secret_key': 'seacasdgyijfhofiuxoannn'}}
# 41.1b7a7f2689ea751d75d4.js:574 {"id":"","device":"[\"c4ca4238a0b923820dcc509a6f75849b\",\"55e2620e-a2b9-4086-bd9a-bc399ba13480\"]","ets":1570562610,"benchmark":"seacasdgyijfhofiuxoannn","time":120,"ts":1570562730734}
# 41.1b7a7f2689ea751d75d4.js:575 打印r
# 41.1b7a7f2689ea751d75d4.js:576
# 41.1b7a7f2689ea751d75d4.js:577 (4) [2, 5, 1, 4]
# 41.1b7a7f2689ea751d75d4.js:587 T类型 string
# 41.1b7a7f2689ea751d75d4.js:588 R类型 object
# 41.1b7a7f2689ea751d75d4.js:608 打印加密后
# 41.1b7a7f2689ea751d75d4.js:609 cdc04cffba0b1f9f7bfa145b27fc5a4430c95d83d526002371ea363f42c608792798170e3f23dd3eda69480553699ad1b002a8ba7fc60070ae77153930a86e5e


def pc_client_sign(data):
    url = 'http://127.0.0.1:3000/enc'
    url = 'http://127.0.0.1:3000/pc'
    url = 'http://127.0.0.1:3000/pc_wasm'
    response = requests.post(url, json=data).json()
    print(response)

def client_sign(data: dict):
#     output = 'b888312f8bf4cfc76a78332e3893a59ffebbfb179510b330fa27f6a2fc022174dbea9a1953dca93048e84ec33d9e550b5b629f2c0d9333e2a57a95ac4cee0a5d'
#     input = {"platform": "android", "uuid": "DBA8090A-5775-42E7-9762-10FD2E8447D870399",
#              "buvid": "a5067487f9e78bdd25c4356a92ae5e8d", "seq_id": "1", "room_id": "23058", "parent_id": "1",
#              "area_id": "34", "timestamp": "1595242600", "secret_key": "axoaadsffcazxksectbbb", "watch_time": "300",
#              "up_id": "11153765", "up_level": "40", "jump_from": "240033", "gu_id": "075284f1c7343e6f180ae02a8ee43561",
#              "play_type": "1",
#              "play_url": "https://d1--cn-gotcha02.bilivideo.com/live-js/883254/live_11153765_9369560_2500.flv?cdn=cn-gotcha02&expires=1595246501&len=0&oi=1032635280&pt=ios&qn=400&trid=f15580399cde4df59bd8b50d68d4a8b4&sigparams=cdn,expires,len,oi,pt,qn,trid&sign=d72637bd518822d6d9d5c65d0ec921a6&ptype=0&src=11&level=1",
#              "s_time": "0", "data_behavior_id": "", "data_source_id": "",
#              "up_session": "l:one:live:record:23058:1586762229", "visit_id": "44c7215c96e1e403f8c821a1efaac9bf",
#              "watch_status": "1", "click_id": "BEA91C5F-F0C6-4F4A-AC1E-144BC9CB1CA240968",
#              "session_id": "E6D29411-3BB3-4136-98B5-01D585778B8C40970", "player_type": "1", "client_ts": "1595242900"}
#     rules = [3, 7, 2, 6, 8]
#     payload = {
#             "t": input,
#             "r": rules
#              }
    # ["sha512", "sha3_512", "sha384", "sha3_384", "blake2b"]
    url = 'http://127.0.0.1:3000/app'
    response = requests.post(url, json=data).json()
    print(response)

if __name__ == '__main__':
    cookie = ""
    session = requests.Session()
    data = heart_beat_e(room_id=23058)
    for index in [1, 2, 3, 4, 5, 6, 7]:
        printer(f"Interval {data['heartbeat_interval']} 后开始第 {index} 次")
        time.sleep(data['heartbeat_interval'])
        response = heart_beat_x(index, data, room_id=23058)
        data['ets'] = response['data']['timestamp']
        data['secret_key'] = response['data']['secret_key']
        data['heartbeat_interval'] = response['data']['heartbeat_interval']
