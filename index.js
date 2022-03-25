const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const enviroment = process.env.NODE_ENV;
const URL = enviroment !== 'development' ? 'https://kiq.netlify.app' : 'http://localhost:8080';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: URL,
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
});

server.listen(3000, () => {});