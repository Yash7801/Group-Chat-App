const WebSocket = require("ws");

module.exports = function startWS(server) {
  const wss = new WebSocket.Server({ server }); // 🔥 attach to same server

  function broadcastAll(payload) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload));
      }
    });
  }

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (msg) => {
      const data = JSON.parse(msg);

      // (your existing logic stays SAME)
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log("WebSocket attached to server ");
};