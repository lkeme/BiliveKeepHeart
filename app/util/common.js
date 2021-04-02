// 随机数
function GetRandomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

// 随机字符串
function generateMixed(n) {
    let str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = "";
    for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * 35);
        res += str[id];
    }
    return res;
}

// 随机字符串
function randomString(length) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
        result += str[Math.floor(Math.random() * str.length)];
    return result;
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

// 格式化参数
function formatParams(data) {
    for (let key in data) {
        // hasOwnProperty
        if (!data.hasOwnProperty(key)) {
            continue;
        }
        if (typeof (data[key]) === 'object') {
            data[key] = JSON.stringify(data[key])
        }
    }
    return data;
}

module.exports = {
    GetRandomNum,
    generateMixed,
    randomString,
    myParseInt,
    formatParams,
}
