const WebSocket = require("ws");

const {
  addClient,
  removeClient,
  getAllUsers,
  isUsernameTaken,
} = require("./connections");

const { handleMessage, handleTyping } = require("./handlers/messageHandler");
const handleRoomEvent = require("./handlers/roomHandler");
const { removeUserFromAllRooms } = require("./rooms");

module.exports = function startWS() {
  const wss = new WebSocket.Server({ port: 3001 });

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

      if (data.type === "init") {
        const { username } = data;

        if (isUsernameTaken(username)) {
          ws.send(JSON.stringify({
            type: "error",
            message: "Username already taken",
          }));
          return;
        }

        addClient(username, ws);
        ws.username = username;

        ws.send(JSON.stringify({
          type: "init_success",
          username,
          users: getAllUsers(),
        }));

        broadcastAll({
          type: "online_users",
          users: getAllUsers(),
        });
      }

      if (data.type === "join_room") {
        handleRoomEvent(ws, {
          ...data,
          userId: ws.username,
        });
      }

      if (data.type === "message") {
        handleMessage({
          ...data,
          userId: ws.username,
        });
      }

      if (data.type === "typing_start" || data.type === "typing_stop") {
        handleTyping({
          ...data,
          userId: ws.username,
        });
      }
    });

    ws.on("close", () => {
      if (ws.username) {
        removeClient(ws.username);
        removeUserFromAllRooms(ws.username);

        broadcastAll({
          type: "online_users",
          users: getAllUsers(),
        });
      }

      console.log("Client disconnected");
    });
  });

  console.log("WebSocket running on 3001 🚀");
};
