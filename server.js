const http = require('http');
const app = require('./app');

//define port to be used
const port = process.env.PORT || 3100;
const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server running")
});

module.exports = server;