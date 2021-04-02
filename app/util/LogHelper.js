"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.LogHelper = void 0;
// @ts-ignore
var log4js_1 = require("log4js");
var LogHelper = /** @class */ (function () {
    function LogHelper() {
    }

    LogHelper.Init = function () {
        //可以用环境变量的形式,向程序传递不同的打印级别,适应不同的场景
        if (process.env.LOG_LEVEL) {
            LogHelper.logLevel = process.env.LOG_LEVEL;
        }
        log4js_1.configure({
            pm2: process.env.NODE_ENV === 'production',
            pm2InstanceVar: 'INSTANCE_ID',
            disableClustering: true,
            //配置不同的输出目的地-这里同时打印到文件 和 控制台
            appenders: {
                console: {
                    type: 'console',
                    replaceConsole: true
                }
            },
            //配置不同的logger类别
            //trace debug info warn error fatal
            categories: {
                "default": {appenders: ['console'], level: LogHelper.logLevel}
            }
        });
        LogHelper.logger = log4js_1.getLogger("enc");
        // log4js.shutdown(
        //     function ()
        //     {
        //         LogHelper.info("Server Stop");
        //         LogHelper.info("");
        //     });
        //重写系统的log debug warn等,代替系统原来的打印功能
        console.log = function (message) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            //首先判断打印级别
            if (LogHelper.logLevelDefine[LogHelper.logLevel] > LogHelper.logLevelDefine.debug) {
                return;
            }
            //为了拿到文件名,行数,函数名等信息,需要解析堆栈信息
            // var stackInfoStr = LogHelper.stackInfo();
            //重新拼装内容,文件名+行数+方法名
            // var info = "[" + stackInfoStr.file + ":" + stackInfoStr.line + " (" + stackInfoStr.method + ")]";
            //调用log4js的打印
            var info = "";
            (_a = LogHelper.logger).debug.apply(_a, __spreadArrays([info, message], args));
        };
        console.debug = function (message) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (LogHelper.logLevelDefine[LogHelper.logLevel] > LogHelper.logLevelDefine.debug) {
                return;
            }
            // var stackInfoStr = LogHelper.stackInfo();
            // var info = "[" + stackInfoStr.file + ":" + stackInfoStr.line + " (" + stackInfoStr.method + ")]";
            var info = "";
            (_a = LogHelper.logger).debug.apply(_a, __spreadArrays([info, message], args));
        };
        console.warn = function (message) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (LogHelper.logLevelDefine[LogHelper.logLevel] > LogHelper.logLevelDefine.warn) {
                return;
            }
            // var stackInfoStr = LogHelper.stackInfo();
            // var info = "[" + stackInfoStr.file + ":" + stackInfoStr.line + " (" + stackInfoStr.method + ")]";
            var info = "";
            (_a = LogHelper.logger).warn.apply(_a, __spreadArrays([info, message], args));
        };
        console.error = function (message) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (LogHelper.logLevelDefine[LogHelper.logLevel] > LogHelper.logLevelDefine.error) {
                return;
            }
            // var stackInfoStr = LogHelper.stackInfo();
            // var info = "[" + stackInfoStr.file + ":" + stackInfoStr.line + " (" + stackInfoStr.method + ")]";
            var info = "";
            (_a = LogHelper.logger).error.apply(_a, __spreadArrays([info, message], args));
        };
        console.info = function (message) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (LogHelper.logLevelDefine[LogHelper.logLevel] > LogHelper.logLevelDefine.info) {
                return;
            }
            // var stackInfoStr = LogHelper.stackInfo();
            // var info = "[" + stackInfoStr.file + ":" + stackInfoStr.line + " (" + stackInfoStr.method + ")]";
            var info = "";
            (_a = LogHelper.logger).info.apply(_a, __spreadArrays([info, message], args));
        };
    };
    //获取堆栈内容
    LogHelper.stackInfo = function (num) {
        if (num === void 0) {
            num = 0;
        }
        var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
        var stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
        var err = new Error();
        var stacklist = err.stack.split('\n').slice(3);
        var s = stacklist[num];
        var sp = stackReg.exec(s) || stackReg2.exec(s);
        var data = {};
        if (sp && sp.length === 5) {
            data.method = sp[1];
            data.path = sp[2];
            data.line = sp[3];
            data.pos = sp[4];
        }
        return data;
    };
    //trace debug info warn error fatal
    //输出级别
    LogHelper.logLevel = 'trace';
    LogHelper.logLevelDefine = {
        "trace": 1,
        "debug": 2,
        "info": 3,
        "warn": 4,
        "error": 5,
        "fatal": 6
    };
    return LogHelper;
}());
exports.LogHelper = LogHelper;
