import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { onSocketMessage } from "../services/socket";

const channelTitles = {
  general: "# General Chat",
  "dev-talk": "# Dev Talk",
};

export default function ChatWindow({ userId, roomId, initialOnlineUsers = [], onOnlineUsersChange }) {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(initialOnlineUsers);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setOnlineUsers(initialOnlineUsers);
  }, [initialOnlineUsers]);

  useEffect(() => {
    const unsubscribe = onSocketMessage((data) => {
      if (data.type === "message") {
        setMessages((prev) => [...prev, data]);
      }

      if (data.type === "history") {
        setMessages(data.messages);
      }

      if (data.type === "typing_start" && data.userId !== userId) {
        setTypingUsers((prev) =>
          prev.includes(data.userId) ? prev : [...prev, data.userId]
        );
      }

      if (data.type === "typing_stop") {
        setTypingUsers((prev) => prev.filter((id) => id !== data.userId));
      }

      if (data.type === "online_users") {
        setOnlineUsers(data.users);
        onOnlineUsersChange?.(data.users);
      }
    });

    return () => unsubscribe();
  }, [userId, onOnlineUsersChange]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#0f1419] via-[#0a0f18] to-[#050a12] relative">
      {/* Header */}
      <div className="p-5 border-b border-blue-500/15 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="transition-transform duration-300 hover:translate-x-1">
            <h2 className="text-2xl font-bold text-white">{channelTitles[roomId] || "# General"}</h2>
            <p className="text-xs text-blue-300/60 mt-1">Team discussion</p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600/30 to-blue-500/20 px-4 py-2.5 text-sm font-semibold text-blue-100 border border-blue-400/30 shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/40 hover:from-blue-600/40 hover:to-blue-500/30 transform hover:scale-105 cursor-pointer">
            <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
            {onlineUsers.length} online
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="mx-auto mt-24 max-w-sm rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-indigo-600/5 backdrop-blur p-12 text-center space-y-3">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-gray-300 font-semibold text-lg">Start a conversation</p>
            <p className="text-sm text-gray-400">Say hello to begin chatting with others in this channel</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <Message
              key={`${msg.userId}-${msg.timestamp || i}-${i}`}
              text={msg.text}
              sender={msg.userId}
              timestamp={msg.timestamp}
              isOwn={msg.userId === userId}
            />
          ))
        )}

        {typingUsers.length > 0 && (
          <div className="text-sm text-gray-400 italic font-medium">
            {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing
            <span className="ml-1 inline-block">
              <span className="animate-bounce inline-block">.</span>
              <span className="animate-bounce inline-block" style={{ animationDelay: "0.1s" }}>.</span>
              <span className="animate-bounce inline-block" style={{ animationDelay: "0.2s" }}>.</span>
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}
