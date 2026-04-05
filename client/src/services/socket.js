let socket;
let currentRoom = "general";
const messageListeners = new Set();

const safeSend = (payload) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(payload));
  }
};

export const connectSocket = (username, callback) => {
  if (socket && socket.readyState !== WebSocket.CLOSED) {
    socket.close();
  }

  socket = new WebSocket("ws://localhost:3001");

  socket.onopen = () => {
    safeSend({
      type: "init",
      username,
    });
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "error" || data.type === "init_success") {
      callback?.(data);

      if (data.type === "init_success") {
        safeSend({
          type: "join_room",
          roomId: currentRoom,
        });
      }
    }

    messageListeners.forEach((listener) => listener(data));
  };

  socket.onerror = () => {
    callback?.({
      type: "error",
      message: "Unable to connect to the chat server.",
    });
  };

  socket.onclose = () => {
    messageListeners.forEach((listener) => listener({ type: "socket_closed" }));
  };
};

export const switchRoom = (roomId) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  if (currentRoom === roomId) return;
  currentRoom = roomId;
  safeSend({
    type: "join_room",
    roomId,
  });
};

export const onSocketMessage = (listener) => {
  messageListeners.add(listener);
  return () => {
    messageListeners.delete(listener);
  };
};

export const sendMessage = (message) => {
  safeSend({
    type: "message",
    roomId: currentRoom,
    text: message,
  });
};

export const sendTyping = (type) => {
  safeSend({
    type,
    roomId: currentRoom,
  });
};
