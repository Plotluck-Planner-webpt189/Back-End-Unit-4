const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.json({ potluck: 'Planner' });
});

server.get('/potluck', (req, res) => {
  res.json({ potluck: 'Party Planner' });
});

// C - create (POST)
// R - read (GET)
// U - update (PUT)
// D - delete (DELETE)

let potluck = [];

// create
server.post('/api/potluck', (req, res) => {
  const potluckInfo = req.body;
  potluckInfo.id = shortid.generate();
  potluck.push(potluckInfo);

  res.status(201).json(potluckInfo);
});

// read
server.get('/api/potluck', (req, res) => {
  res.status(200).json(potluck);
});

const PORT = process.env.PORT || 4500;

server.listen(PORT, () => {
  console.log(`n*** Server is listening on  port ${PORT} ***\n`);
});