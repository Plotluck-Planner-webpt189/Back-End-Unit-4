const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('../users/user-router');
const potluckRouter = require('../potlucks/potluck-router');
const foodRouter = require('../foods/food-router.js');
const authRouter = require('../auth/auth-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

server.use('/api/users', userRouter);
server.use('/api/potlucks', potluckRouter);
server.use('/api/foods', foodRouter);
server.use('/api/auth', authRouter);

module.exports = server;
