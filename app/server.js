import http from 'http'
import socketIo from 'socket.io'
import app from './app';
import { PORT } from './config';

const server = http.Server(app.callback());
const io = socketIo(server);

app.context.io = io;

io.on('connection', (socket) => {
  console.log('a user connected')
  app.context.sct = socket;
});

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on port: ${PORT}`);
});

export default server;
