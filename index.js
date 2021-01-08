
const server = require('./api/server.js');

const PORT = process.env.PORT || 4500;

server.listen(PORT, () => {
  console.log(`n*** Server is listening on  port ${PORT} ***\n`);
});
