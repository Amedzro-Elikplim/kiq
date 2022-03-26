const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const config = require('config');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.get('URL'),
    credentials: true,
  },
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
});

server.listen(PORT, () => {});