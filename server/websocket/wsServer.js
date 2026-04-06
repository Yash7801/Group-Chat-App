const { addClient, removeClient, isUsernameTaken } = require("./connections");
const { removeUserFromAllRooms } = require("./rooms");
const handleRoomEvent = require("./handlers/roomHandler");
const { handleMessage, handleTyping } = require("./handlers/messageHandler");

module.exports = function startWS(app) {
  app.ws("/", (ws, req) => {
    console.log("Client connected");

    ws.on("message", (msg) => {
      try {
        const data = JSON.parse(msg.toString());
        console.log("Received:", data);

        const { type } = data;

        
        if (type === "init") {
          const { username } = data;

          if (!username || !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
            ws.send(JSON.stringify({ type: "error", message: "Invalid username." }));
            return;
          }

          if (isUsernameTaken(username)) {
            ws.send(JSON.stringify({ type: "error", message: "Username already taken." }));
            return;
          }

          ws.username = username;
          addClient(username, ws);

          ws.send(JSON.stringify({ type: "init_success", username }));
          console.log(`${username} authenticated`);
          return;
        }

        
        if (!ws.username) {
          ws.send(JSON.stringify({ type: "error", message: "Not authenticated." }));
          return;
        }

        if (type === "join_room") {
          handleRoomEvent(ws, data);
        } else if (type === "message") {
          handleMessage({ ...data, userId: ws.username });
        } else if (type === "typing_start" || type === "typing_stop") {
          handleTyping({ ...data, userId: ws.username });
        }

      } catch (err) {
        console.error("Invalid message:", err);
      }
    });

    ws.on("close", () => {
      if (ws.username) {
        removeClient(ws.username);
        removeUserFromAllRooms(ws.username);
        console.log(`${ws.username} disconnected`);
      }
    });
  });

  console.log("WebSocket ready to accept connections");
};