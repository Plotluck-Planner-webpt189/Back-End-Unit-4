const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const user = require('../users/user-router');
const potluck = require('../potlucks/potluck-router');
const food = require('../foods/food-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

server.use('/api/users', user);
server.use('/api/potlucks', potluck);
server.use('/api/foods', food);

module.exports = server;
