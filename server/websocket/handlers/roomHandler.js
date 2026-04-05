const { joinRoom } = require("../rooms");

function handleRoomEvent(ws, data) {
  const { type, roomId } = data;

  if (type === "join_room") {
    joinRoom(roomId, ws.username);
    console.log(`${ws.username} joined ${roomId}`);
  }
}

module.exports = handleRoomEvent;