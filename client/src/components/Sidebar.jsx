const channels = [
  { id: "general", label: "# General" },
  { id: "dev-talk", label: "# Dev Talk" },
];

export default function Sidebar({ userId, onlineUsers = [], activeChannel, onSelectChannel }) {
  const otherUsers = onlineUsers.filter((user) => user !== userId);

  return (
    <aside className="w-72 bg-gradient-to-b from-[#1a1f2e] to-[#0f1419] border-r border-blue-500/10 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-blue-500/20 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-blue-300/80 uppercase tracking-widest">You</p>
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        </div>
        <p className="text-lg font-bold text-white truncate">{userId}</p>
        <p className="mt-3 text-xs text-blue-300/70 font-medium">{onlineUsers.length} member{onlineUsers.length !== 1 ? 's' : ''} online</p>
      </div>

      {/* Channels Section */}
      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
        <div>
          <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3 px-1">Channels</p>
          <div className="space-y-2">
            {channels.map((channel) => (
              <button
                key={channel.id}
                type="button"
                onClick={() => onSelectChannel(channel.id)}
                className={`w-full rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-all duration-300 transform ${
                  activeChannel === channel.id
                    ? "bg-gradient-to-r from-blue-600/50 to-blue-500/30 text-blue-100 border border-blue-400/40 shadow-lg shadow-blue-600/20 scale-105"
                    : "text-gray-400 hover:text-gray-300 hover:bg-white/8 border border-transparent hover:border-blue-500/30 hover:scale-102"
                }`}
              >
                {channel.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

        {/* Members Section */}
        <div>
          <div className="flex items-center justify-between px-1 mb-3">
            <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Members</p>
            <span className="text-xs font-semibold text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-full">{otherUsers.length}</span>
          </div>
          <div className="space-y-2">
            {otherUsers.length === 0 ? (
              <p className="text-sm text-gray-500 italic px-1">Waiting for others...</p>
            ) : (
              otherUsers.map((user) => (
                <div key={user} className="rounded-lg bg-gradient-to-r from-blue-600/30 to-blue-500/10 border border-blue-400/20 px-3.5 py-2.5 text-sm text-blue-100 font-medium hover:from-blue-600/50 hover:to-blue-500/30 transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:shadow-blue-600/20 cursor-pointer">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-300 mr-2 animate-pulse"></span>
                  {user}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-blue-500/10 bg-gradient-to-r from-blue-600/10 to-transparent text-xs text-gray-500 text-center space-y-1">
        <p className="font-semibold text-gray-400">Press Enter to Send </p>
        <p className="font-semibold text-gray-400">Press Shift + Enter for a new line</p>
      </div>
    </aside>
  );
}
