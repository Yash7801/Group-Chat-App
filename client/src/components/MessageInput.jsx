import { useRef, useState } from "react";
import { sendMessage, sendTyping } from "../services/socket";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const typingTimeout = useRef(null);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    sendMessage(trimmed);
    setMessage("");
    sendTyping("typing_stop");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    sendTyping("typing_start");

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      sendTyping("typing_stop");
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-5 border-t border-blue-500/15 bg-gradient-to-t from-[#0a0f18] to-[#0f1419] backdrop-blur flex items-center gap-3">
      <textarea
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
        className="flex-1 min-h-[48px] resize-none rounded-xl border border-blue-500/40 bg-white/5 backdrop-blur px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 focus:bg-white/15 hover:border-blue-400/60 hover:bg-white/8 shadow-sm hover:shadow-md"
        placeholder="Type a message..."
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={!message.trim()}
        className={`rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md transform ${
          message.trim()
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 hover:shadow-xl hover:shadow-blue-600/60 border border-blue-400/40 active:scale-95 hover:scale-105 active:shadow-md"
            : "bg-gradient-to-r from-blue-900/40 to-blue-800/30 text-gray-500 cursor-not-allowed border border-blue-500/10"
        }`}
      >
        Send
      </button>
    </div>
  );
}
