const formatTime = (timestamp) => {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Message({ text, sender, isOwn, timestamp }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} group`}>
      <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-md transition-all duration-300 backdrop-blur transform hover:scale-105 ${
        isOwn 
          ? "bg-gradient-to-br from-blue-600/60 to-blue-500/40 text-white border border-blue-400/40 hover:shadow-xl hover:shadow-blue-600/40" 
          : "bg-gradient-to-br from-white/10 to-white/5 text-gray-100 border border-white/15 hover:border-white/30 hover:bg-gradient-to-br hover:from-white/20 hover:to-white/15 hover:shadow-lg hover:shadow-white/5"
      }`}>
        {!isOwn && (
          <p className="text-xs font-bold text-blue-200 mb-2 uppercase tracking-wider">{sender}</p>
        )}
        <p className="whitespace-pre-wrap break-words text-sm leading-6 font-medium">{text}</p>
        {timestamp && (
          <p className={`mt-2 text-xs font-medium transition-all duration-300 ${
            isOwn ? "text-blue-200/60 text-right group-hover:text-blue-200" : "text-gray-500 group-hover:text-gray-300"
          }`}>
            {formatTime(timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}
