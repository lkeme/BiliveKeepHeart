const getClientIp = function (request) {
    return request.socket.remoteAddress || // 判断后端的 socket 的 IP
        request.connection.socket.remoteAddress ||
        request.connection.remoteAddress || // 判断 connection 的远程 IP
        request.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        request.ip || // express框架
        request.ip.match(/\d+\.\d+\.\d+\.\d+/) || // express框架
        '';
}

const getClientHost = function (request) {
    return request.headers.host
    // let domain = request.headers['referer'].match(/^(\w+:\/\/)?([^\/]+)/i);
    // return domain ? domain[2].split(':')[0].split('.').slice(-2).join('.') : null;
}


module.exports = function () {
    return function (req, res, next) {
        console.log(`Client - ` + getClientHost(req) + ` - ` + getClientIp(req))
        next();
    }
}
