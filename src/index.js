const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Room = require('./game/Room');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('src/public'));

const rooms = new Map();

io.on('connection', (socket) => {
  let currentRoom = null;

  socket.on('join-game', () => {
    // Encontrar o crear sala
    let room = null;
    for (const [id, r] of rooms) {
      if (r.players.size < 4) {
        room = r;
        break;
      }
    }

    if (!room) {
      const roomId = Date.now().toString();
      room = new Room(roomId);
      rooms.set(roomId, room);
    }

    // Añadir jugador
    const player = room.addPlayer(socket.id);
    currentRoom = room;

    socket.join(room.id);
    socket.emit('game-joined', {
      roomId: room.id,
      playerId: socket.id,
      team: player.team
    });
  });

  socket.on('player-move', (movement) => {
    if (!currentRoom) return;

    const player = currentRoom.players.get(socket.id);
    if (player) {
      player.move(movement.x, movement.y);
    }
  });

  socket.on('disconnect', () => {
    if (currentRoom) {
      currentRoom.removePlayer(socket.id);
      if (currentRoom.players.size === 0) {
        rooms.delete(currentRoom.id);
      }
    }
  });
});

// Game loop
setInterval(() => {
  rooms.forEach(room => {
    room.update();
    io.to(room.id).emit('game-state', room.getState());
  });
}, 1000 / 60);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
