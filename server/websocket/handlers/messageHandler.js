const { getRoomUsers } = require("../rooms");
const { getClient } = require("../connections");

function broadcastToRoom(roomId, payload) {
  const users = getRoomUsers(roomId);

  users.forEach((username) => {
    const client = getClient(username);
    if (client) {
      client.send(JSON.stringify(payload));
    }
  });
}

function handleMessage(data) {
  const { roomId, text, userId } = data;

  broadcastToRoom(roomId, {
    type: "message",
    text,
    userId,
    timestamp: new Date().toISOString(),
  });
}

function handleTyping(data) {
  const { roomId, userId, type } = data;

  broadcastToRoom(roomId, {
    type,
    userId,
  });
}

module.exports = {
  handleMessage,
  handleTyping,
};
