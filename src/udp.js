const dgram = require("dgram");

const broadcastPacket = (packet, broadcastAddr) => {
    return new Promise((resolve, reject) => {
        const socket = dgram.createSocket("udp4");

        socket.on("error", (err) => {
            socket.close();
            reject(err);
        });

        socket.on("listening", () => {
            socket.setBroadcast(true);
            socket.connect(1, broadcastAddr);
        })

        socket.on("connect", () => {
            socket.send(packet, (err) => {
                socket.close();
                
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        socket.bind(4546);
    })
}

module.exports = {
    broadcastPacket
}
