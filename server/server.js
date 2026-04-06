const http = require("http");
const app = require("./app");
const initWS = require("./websocket/wsServer");

const server = http.createServer(app);

// attach websocket to SAME server
initWS(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});