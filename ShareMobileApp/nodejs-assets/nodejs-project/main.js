const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

app.use(express.static(path.join(__dirname, 'out')));

const rooms = new Map();
io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    if (!rooms.has(roomId)) rooms.set(roomId, new Set());
    rooms.get(roomId).add(socket.id);
    socket.to(roomId).emit('user-joined', socket.id);
    const otherUsers = Array.from(rooms.get(roomId)).filter(id => id !== socket.id);
    socket.emit('room-users', otherUsers);
  });

  socket.on('signal', (data) => {
    io.to(data.to).emit('signal', { from: socket.id, signal: data.signal });
  });

  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      if (roomId !== socket.id) socket.to(roomId).emit('user-left', socket.id);
    }
  });
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Mobile Server running on port 3000');
});