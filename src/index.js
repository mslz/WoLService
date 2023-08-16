const express = require("express");
const { getMagicPacket } = require("./magicPacket");
const { broadcastPacket } = require("./udp");

const app = express();

const MAC = "xx:xx:xx:xx:xx:xx";
const BROADCAST_ADDR = "192.168.0.255";

app.get("/", async (req, res) => {
    try {
        const magicPacket = getMagicPacket(MAC);
        await broadcastPacket(magicPacket, BROADCAST_ADDR);

        res.status(200).send("Server starting...")
    } catch (error) {
        res.status(500).send("Error while sending wake signal: " + error)
    }
});

app.listen(4546, () => {
    console.log("Service listening...")
});
