const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../users/authenticate-middleware.js');
const authRouter = require('../users/userRouter.js');
const potluckRouter = require('../users/potluckRouter.js');
const organizersRouter = require('../potlucks/organizerRouter');
const foodRouter = require('../foods/foodRouter.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

server.use('/api/auth', authRouter);
server.use('/potlucks', potluckRouter);
server.use('/potlucks', organizersRouter);
server.use('/foods', foodRouter);

module.exports = server;
