import express from 'express';
import http from 'http';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});

const server = http.createServer(app);
server.listen(3000, () => console.log(`listening on port ${3000}`));
