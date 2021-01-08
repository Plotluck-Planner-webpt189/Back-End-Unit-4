const express = require('express');
const helmet = require('helmet');

const user = require('./users/user-router.js');
const potluck = require('./potluck/potluck-router.js');
const organizer = require('./potlucks/organizer-router.js');
const food = require('./foods/food-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

server.use('/api/users', user);
server.use('/apipotlucks', potluck);
server.use('/api/orgnizer', organizer);
server.use('/api/foods', food);

module.exports = server;
