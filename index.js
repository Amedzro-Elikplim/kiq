const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat-message', (msg) => {
    console.log(msg);
  });
});

server.listen(3000, () => {
  console.log('server running...');
});