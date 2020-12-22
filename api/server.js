const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../users/authenticate-middleware.js');
const authRouter = require('../users/organizerRouter.js');
const potluckRouter = require('../users/potluckRouter.js');
const foodRouter = require('../foods/foodRouter.js');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is up and running'});
})

server.use('/api/auth', authRouter);
server.use('/api/potlucks',authenticate, potluckRouter);
server.use('/users', organizerRouter);
server.use('/foods', foodRouter);


module.exports = server;