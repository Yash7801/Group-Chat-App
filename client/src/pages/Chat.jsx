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
    <div className="flex w-full h-full text-white">
      
      {/* ========== LEFT SIDEBAR ========== */}
      <div className="w-[260px] border-r border-white/5 bg-[#0c1117]/80 backdrop-blur-md">
        <Sidebar
          userId={userId}
          onlineUsers={onlineUsers}
          activeChannel={activeChannel}
          onSelectChannel={setActiveChannel}
        />
      </div>

      {/* ========== MAIN CHAT AREA ========== */}
      <div className="flex-1 flex flex-col bg-[#0f1419]/60 backdrop-blur-md">
        
        {/* Header */}
        <div className="h-[70px] px-6 flex items-center justify-between border-b border-white/5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              # {activeChannel}
            </h2>
            <p className="text-xs text-gray-400">
              {onlineUsers.length} online • real-time chat
            </p>
          </div>

          <div className="text-xs text-gray-400">
            You: <span className="text-white">{userId}</span>
          </div>
        </div>

        {/* Chat contents  */}
        <div className="flex-1 overflow-hidden">
          <ChatWindow
            userId={userId}
            roomId={activeChannel}
            initialOnlineUsers={initialOnlineUsers}
            onOnlineUsersChange={setOnlineUsers}
          />
        </div>
      </div>

      {/* =-=-=-=-=-= RIGHT INFO PANEL HERE -=-=-=-= */}
      <div className="w-[280px] border-l border-white/5 bg-[#0c1117]/70 backdrop-blur-md p-5 flex flex-col">
        
        {/* Profiles here */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-xl font-bold shadow-lg">
            {userId[0]?.toUpperCase()}
          </div>

          <h3 className="mt-3 font-semibold">{userId}</h3>
          <span className="text-xs text-green-400 mt-1">
            ● Online
          </span>
        </div>

        
        <div className="border-t border-white/5 mb-4"></div>

        {/* Channel Information */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2 text-gray-300">
            Channel
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            This is the <span className="text-white">#{activeChannel}</span> channel.
            Conversations here are live and disappear when users leave.
          </p>
        </div>

        {/* Members list  */}
        <div className="flex-1 overflow-y-auto">
          <h4 className="text-sm font-semibold mb-3 text-gray-300">
            Members ({onlineUsers.length})
          </h4>

          <div className="space-y-2">
            {onlineUsers.map((user, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 transition"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs font-bold">
                  {user[0]?.toUpperCase()}
                </div>

                <span className="text-sm text-gray-200 truncate">
                  {user}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer h idhr */}
        <div className="pt-4 border-t border-white/5 text-xs text-gray-500">
          Tip: Try saying hi to everyone in the channel.....! 
        </div>
      </div>
    </div>
  );
}