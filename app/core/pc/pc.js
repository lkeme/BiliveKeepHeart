const CryptoJS = require("crypto-js");

const spyder = function (s, rule, key) {
    // let s = JSON.stringify(t);
    console.log("↓---加密前t数据---↓")
    console.log(s);
    console.log("↓---加密前r数据---↓")
    console.log(rule);
    for (const r of rule) {
        switch (r) {
            case 0:
                s = CryptoJS.HmacMD5(s, key).toString(CryptoJS.enc.Hex);
                s = CryptoJS.HmacMD5(s, key).toString(CryptoJS.enc.Hex);
                break;
            case 1:
                s = CryptoJS.HmacSHA1(s, key).toString(CryptoJS.enc.Hex);
                break;
            case 2:
                s = CryptoJS.HmacSHA256(s, key).toString(CryptoJS.enc.Hex);
                break;
            case 3:
                s = CryptoJS.HmacSHA224(s, key).toString(CryptoJS.enc.Hex);
                break;
            case 4:
                s = CryptoJS.HmacSHA512(s, key).toString(CryptoJS.enc.Hex);
                break;
            case 5:
                s = CryptoJS.HmacSHA384(s, key).toString(CryptoJS.enc.Hex);
                break;
            default:
                break;
        }
    }
    console.log("↓---加密后s数据---↓")
    console.log(s);
    return s;
}

module.exports = {
    spyder: spyder,
}
