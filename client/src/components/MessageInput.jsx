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
    sendTyping("stop");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    sendTyping("start");

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      sendTyping("stop");
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-5 py-4 border-t border-white/5 bg-[#0f1419]/80 backdrop-blur">
      
      <div className="flex items-end gap-3">
        
        {/* Input */}
        <textarea
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Message..."
          className="flex-1 resize-none rounded-lg bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none border border-white/10 focus:border-white/20 focus:bg-white/10 transition"
        />

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim()}
          className={`
            px-4 py-2.5 rounded-lg text-sm font-medium transition
            ${message.trim()
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-white/5 text-gray-500 cursor-not-allowed"}
          `}
        >
          Send
        </button>
      </div>

      {/* Hint */}
      <div className="mt-2 text-[11px] text-gray-500">
        Press Enter to send • Shift + Enter for new line
      </div>
    </div>
  );
}