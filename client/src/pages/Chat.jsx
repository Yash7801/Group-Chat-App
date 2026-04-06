import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import { onSocketMessage } from "../services/socket.js";

export default function Chat({ userId, initialOnlineUsers = [] }) {
  const [onlineUsers, setOnlineUsers] = useState(initialOnlineUsers);
  const [activeChannel, setActiveChannel] = useState("general");

  useEffect(() => {
    const unsub = onSocketMessage((data) => {
      if (data.type === "room_users") {
        setOnlineUsers(data.users);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex h-screen bg-[#0f1419] text-white">
      <Sidebar
        userId={userId}
        onlineUsers={onlineUsers}
        activeChannel={activeChannel}
        onSelectChannel={setActiveChannel}
      />
      <ChatWindow
        userId={userId}
        roomId={activeChannel}
        initialOnlineUsers={initialOnlineUsers}
        onOnlineUsersChange={setOnlineUsers}
      />
    </div>
  );
}