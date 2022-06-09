const wasm_ = require('hash-wasm');

const wasm = {};

// const md4Hasher = createMD4();
// const md5Hasher = createMD5();
// const sha1Hasher = createSHA1();
// const sha224Hasher = createSHA224();
// const sha256Hasher = createSHA256();
// const sha384Hasher = createSHA384();
// const sha512Hasher = createSHA512();
// const sha3224Hasher = createSHA3(224);
// const sha3256Hasher = createSHA3(256);
// const sha3384Hasher = createSHA3(384);
// const sha3512Hasher = createSHA3(512);

async function getHashWasmHMAC(algorithm, key, data) {
    const hmac = await wasm_.createHMAC(algorithm, key);
    hmac.update(data);
    return hmac.digest();
}

const spyder = async function (t, r) {
    console.log("↓---加密前t数据---↓")
    console.log(t);
    console.log("↓---加密前r数据---↓")
    console.log(r);

    // wasm.sha256 = await wasm_.createSHA256();
    wasm.sha384 = await wasm_.createSHA384();
    wasm.sha512 = await wasm_.createSHA512();
    wasm.blake2b = await wasm_.createBLAKE2b();
    // wasm.blake2s = await wasm_.createBLAKE2s();
    // wasm.blake3 = await wasm_.createBLAKE3();
    // wasm.sha3 = await wasm_.createSHA3();
    wasm.sha3384 = await wasm_.createSHA3(384)
    wasm.sha3512 = await wasm_.createSHA3(512);

    //     wasm.hash('BLAKE2b512', wasm.hash('SHA3-384', wasm.hash('SHA384', wasm.hash('SHA3-512', wasm.hash('SHA512', JSON.stringify(data))))));
    let s = wasm.blake2b.init().update(
        wasm.sha3384.init().update(
            wasm.sha384.init().update(
                wasm.sha3512.init().update(
                    wasm.sha512.init().update(t).digest()
                ).digest()
            ).digest()
        ).digest()
    ).digest()

    console.log("↓---加密后s数据---↓")
    console.log(s);

    // let s = wasm.sha512.init().update(JSON.stringify(data)).digest()
    // let s = wasm.sha512.init().update(data).digest()
    // s = wasm.sha3512.init().update(s).digest()
    // s = wasm.sha384.init().update(s).digest()
    // s = wasm.sha3384.init().update(s).digest()
    // s = wasm.blake2b.init().update(s).digest()
    return s
}

module.exports = {
    spyder: spyder,
}