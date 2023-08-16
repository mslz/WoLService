const parseMACtoHexArray = (mac) => {
    return mac.split(":").map((str) => Number("0x" + str));
} 

const getMagicPacket = (mac) => {
    const magicBytes = new Array(6).fill(0xff);
    const destinationMac = parseMACtoHexArray(mac);

    for (let i = 0; i < 16; i++) {
        magicBytes.push(...destinationMac);
    }

    return Buffer.from(magicBytes);
}

module.exports = {
    getMagicPacket
}