const { joinRoom, getRoomUsers } = require("../rooms");
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

function handleRoomEvent(ws, data) {
  const { type, roomId } = data;

  if (type === "join_room") {
    joinRoom(roomId, ws.username);
    console.log(`${ws.username} joined ${roomId}`);

    const users = Array.from(getRoomUsers(roomId));
    broadcastToRoom(roomId, {
      type: "room_users",
      roomId,
      users,
    });
  }
}

module.exports = handleRoomEvent;