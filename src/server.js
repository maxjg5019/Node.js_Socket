const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3000;

const server = express().listen(PORT, () => {
    console.log(`正在監聽Port :  ${PORT}`);
});

const webSocket = new SocketServer({ server });

webSocket.on('connection', (connectedWebSocket) => {
    console.log('Client connected');
    connectedWebSocket.on('message', (data) => {
        data = data.toString();
        console.log(data);

        connectedWebSocket.send(data);

        let clients = webSocket.clients;
        clients.forEach((clients) => {
            clients.send(data);
        });
    });
    connectedWebSocket.on('close', () => {
        console.log('Close connected');
    });
});
