const http = require("http");
const app = require("./app");

const PORT = 3000;

const server = http.createServer(PORT);

server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
