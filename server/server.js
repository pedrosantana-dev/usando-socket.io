const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`O servidor está ativo na porta ${port}.`)
});

io.on('connection', (socket) => {
    console.log('Um usuário acabou de se conectar.');
    socket.on('disconnect', () => {
        console.log('Um usuário se desconectou.');
    });
    socket.on('startGame', () => {
        io.emit('startGame');
    });
    socket.on('crazyIsClicked', (data)=> {
        io.emit('crazyIsClicked',data);
    });
});