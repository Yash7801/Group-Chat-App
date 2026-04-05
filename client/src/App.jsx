import { useState } from "react";
import Chat from "./pages/Chat";
import { connectSocket } from "./services/socket";

function App() {
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [initialOnlineUsers, setInitialOnlineUsers] = useState([]);

  const handleJoin = () => {
    if (!input.trim()) {
      setError("Please enter a valid username");
      return;
    }

    setError("");
    setIsConnecting(true);

    connectSocket(input, (response) => {
      if (response.type === "error") {
        setError(response.message);
        setIsConnecting(false);
        return;
      }

      if (response.type === "init_success") {
        setInitialOnlineUsers(response.users || []);
        setUsername(input);
        setIsConnecting(false);
      }
    });
  };

  if (!username) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f1419] text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 bg-gradient-to-br from-[#1a1f2e] via-[#1a1f2e] to-[#0f1419] border border-blue-400/20 shadow-2xl shadow-blue-500/10 p-8 rounded-2xl w-full max-w-md backdrop-blur">
          <div className="space-y-1 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">Chat</span>
              <span className="text-white">App</span>
            </h1>
            <p className="text-sm text-blue-300/60 font-medium">Real-time messaging platform</p>
          </div>

          <label className="block mb-3 text-sm font-semibold text-gray-200">
            Username
          </label>
          <input
            autoFocus
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleJoin();
              }
            }}
            className="w-full rounded-lg border border-blue-500/40 bg-white/5 backdrop-blur px-4 py-3 text-white outline-none placeholder:text-gray-500 transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 focus:bg-white/15 hover:border-blue-400/60 hover:bg-white/8 hover:shadow-md"
            placeholder="Enter username..."
          />

          {error ? (
            <p className="mt-3 text-sm text-red-400 font-semibold">{error}</p>
          ) : (
            <p className="mt-3 text-xs text-gray-400">
              Use letters, numbers, underscores • 3-20 characters. Press Enter to join.
            </p>
          )}

          <button
            onClick={handleJoin}
            disabled={isConnecting}
            className={`mt-7 w-full rounded-lg px-4 py-3 text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 transform ${
              isConnecting
                ? "bg-gradient-to-r from-blue-900/60 to-indigo-900/60 cursor-not-allowed opacity-60 border border-blue-500/20"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/40 border border-blue-400/30 hover:shadow-2xl hover:shadow-blue-600/60 active:scale-95 hover:scale-105 active:shadow-md"
            }`}
          >
            {isConnecting ? "Connecting..." : "Enter Chat"}
          </button>

          <p className="mt-6 text-xs text-center text-gray-500">
            No account needed • Instant access
          </p>
        </div>
      </div>
    );
  }

  return <Chat userId={username} initialOnlineUsers={initialOnlineUsers} />;
}

export default App;
