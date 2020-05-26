import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '..', 'public')));

io.on('connection', socket => {
  socket.on('add_user', username => {
    socket.username = username;
    socket.broadcast.emit('user_joined', { username: socket.username });
  });

  socket.on('new_message', data => {
    socket.broadcast.emit('new_message', {
      username: socket.username,
      message: data,
    });
  });

  // socket.on('disconnect', () => {
  //   io.emit('user connection', 'A user has disconnected.');
  // });
});

server.listen(3000, () => console.log(`listening on port ${3000}`));
