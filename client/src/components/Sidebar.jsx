const channels = [
  { id: "general", label: "# General" },
  { id: "dev-talk", label: "# Dev Talk" },
];

export default function Sidebar({ userId, onlineUsers = [], activeChannel, onSelectChannel }) {
  const otherUsers = onlineUsers.filter((user) => user !== userId);

  return (
    <aside className="w-full h-full bg-[#0b121f] flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="text-xs uppercase tracking-[0.35em] text-blue-300/70">QuickChat</div>
        <h2 className="mt-4 text-2xl font-semibold text-white">Live Rooms</h2>
        <p className="mt-2 text-sm text-gray-400">Choose a channel and jump into the conversation.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
            <span>Rooms</span>
            <span>{otherUsers.length + 1}</span>
          </div>

          <div className="space-y-3">
            {channels.map((channel) => (
              <button
                key={channel.id}
                type="button"
                onClick={() => onSelectChannel(channel.id)}
                className={`w-full rounded-3xl px-4 py-3 text-left text-sm font-medium transition duration-300 ${
                  activeChannel === channel.id
                    ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-violet-500/20"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {channel.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
            <span>Members</span>
            <span>{otherUsers.length}</span>
          </div>

          <div className="space-y-3">
            {otherUsers.length === 0 ? (
              <p className="text-sm text-gray-400 italic">Waiting for others...</p>
            ) : (
              otherUsers.map((user) => (
                <div key={user} className="flex items-center gap-3 rounded-3xl bg-[#0c1117] px-4 py-3 text-sm text-gray-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20 text-xs font-semibold text-white">
                    {user[0]?.toUpperCase()}
                  </div>
                  <span className="truncate">{user}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 p-5 text-xs text-gray-400">
        Press Enter to send • Shift + Enter for a new line.
      </div>
    </aside>
  );
}
