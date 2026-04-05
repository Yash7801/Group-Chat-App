const clients = new Map(); // username -> ws

function addClient(username, ws) {
  clients.set(username, ws);
}

function removeClient(username) {
  clients.delete(username);
}

function getClient(username) {
  return clients.get(username);
}

function getAllUsers() {
  return Array.from(clients.keys());
}

function isUsernameTaken(username) {
  return clients.has(username);
}

module.exports = {
  addClient,
  removeClient,
  getClient,
  getAllUsers,
  isUsernameTaken,
};