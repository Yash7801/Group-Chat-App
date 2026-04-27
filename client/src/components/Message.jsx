const formatTime = (timestamp) => {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Message({ text, sender, isOwn, timestamp }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      
      {/* Wrapper */}
      <div className="flex items-end gap-2 max-w-[70%]">
        
        {/* Avatar bs dussro ka */}
        {!isOwn && (
          <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs font-semibold text-white shrink-0">
            {sender?.[0]?.toUpperCase()}
          </div>
        )}

        {/* Message - Bubble - UI */}
        <div
          className={`
            px-4 py-2.5 rounded-2xl text-sm leading-relaxed
            ${isOwn
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-white/10 text-gray-100 rounded-bl-md"}
          `}
        >
          {/* Sender bs dusro ke liy */}
          {!isOwn && (
            <div className="text-xs text-gray-400 mb-1 font-medium">
              {sender}
            </div>
          )}

          {/* Message contents */}
          <p className="whitespace-pre-wrap break-words">
            {text}
          </p>

          {/* Time-stamp */}
          {timestamp && (
            <div
              className={`text-[10px] mt-1 ${
                isOwn ? "text-blue-200/70 text-right" : "text-gray-400"
              }`}
            >
              {formatTime(timestamp)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}