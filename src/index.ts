import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '..', 'public')));

let totalConnections = 0;
io.on('connection', socket => {
  let isUserAdded = false;

  socket.on('add_user', username => {
    if (isUserAdded) return;

    socket.username = username;
    totalConnections += 1;
    isUserAdded = true;

    socket.broadcast.emit('user_joined', { username: socket.username });
  });

  socket.on('new_message', data => {
    socket.broadcast.emit('new_message', {
      username: socket.username,
      message: data.message,
    });
  });

  socket.on('typing_start', () => {
    socket.broadcast.emit('typing_start', { username: socket.username });
  });

  socket.on('typing_stop', () => {
    socket.broadcast.emit('typing_stop', { username: socket.username });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user_left', {
      username: socket.username,
    });
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));
