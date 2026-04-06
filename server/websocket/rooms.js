const rooms = new Map();

function joinRoom(roomId, userId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId).add(userId);
}

function leaveRoom(roomId, userId) {
  if (rooms.has(roomId)) {
    rooms.get(roomId).delete(userId);
  }
}

function removeUserFromAllRooms(userId) {
  rooms.forEach((users) => users.delete(userId));
}

function getRoomUsers(roomId) {
  return rooms.get(roomId) || new Set();
}

module.exports = {
  joinRoom,
  leaveRoom,
  removeUserFromAllRooms,
  getRoomUsers,
};
