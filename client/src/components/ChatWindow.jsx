import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { onSocketMessage } from "../services/socket";

const channelTitles = {
  general: "General",
  "dev-talk": "Dev Talk",
};

export default function ChatWindow({
  userId,
  roomId,
  initialOnlineUsers = [],
  onOnlineUsersChange,
}) {
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

      if (data.type === "start" && data.userId !== userId) {
        setTypingUsers((prev) =>
          prev.includes(data.userId) ? prev : [...prev, data.userId]
        );
      }

      if (data.type === "stop") {
        setTypingUsers((prev) =>
          prev.filter((id) => id !== data.userId)
        );
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
    <div className="flex-1 flex flex-col bg-[#0f1419]/40">
      
      {/* ========= HEADERS ========= */}
      <div className="h-[70px] px-6 flex items-center justify-between border-b border-white/5 bg-[#0f1419]/80 backdrop-blur">
        
        <div>
          <h2 className="text-lg font-semibold">
            # {channelTitles[roomId] || "General"}
          </h2>
          <p className="text-xs text-gray-400">
            {onlineUsers.length} online
          </p>
        </div>

        <div className="text-xs text-gray-400">
          chatting as <span className="text-white">{userId}</span>
        </div>
      </div>

      {/* -=-=-=-=-= message -=-=-=-=-= */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
        
        {messages.length === 0 ? (
          <div className="mt-24 text-center text-gray-400">
            <p className="text-sm">No messages yet.</p>
            <p className="text-xs mt-1">
              You might as well break the silence.
            </p>
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

        {/* =-=-=-=-=-= typing .... -=-=-=-= */}
        {typingUsers.length > 0 && (
          <div className="text-xs text-gray-500 italic">
            {typingUsers.join(", ")}{" "}
            {typingUsers.length === 1 ? "is" : "are"} typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ========= INPUT ========= */}
      <div className="border-t border-white/5 bg-[#0f1419]/70 backdrop-blur">
        <MessageInput />
      </div>
    </div>
  );
}