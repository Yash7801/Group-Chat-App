import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";

export default function Chat({ userId, initialOnlineUsers = [] }) {
  const [onlineUsers, setOnlineUsers] = useState(initialOnlineUsers);
  const [activeChannel, setActiveChannel] = useState("general");

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
