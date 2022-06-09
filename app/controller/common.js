const handleCommonGet = (request, response) => {
    console.error(`不支持的GET请求方式`);
    // response.setHeader('Content-Type', 'application/json')
    response.status(405).json({
        "code": -1,
        "s": "",
        "message": "HTTP 405 Method Not Allowed"
    })
}

module.exports = {
    handleCommonGet: handleCommonGet,
}