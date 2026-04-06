module.exports = function startWS(app) {
  app.ws("/", (ws, req) => {
    console.log("Client connected");

    ws.on("message", (msg) => {
      try {
        const data = JSON.parse(msg.toString());
        console.log("Received:", data);
      } catch (err) {
        console.error("Invalid message");
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log("WebSocket ready 🚀");
};