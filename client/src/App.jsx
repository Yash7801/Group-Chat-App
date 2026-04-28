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
      setError("Enter a username");
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
      <div className="h-screen flex items-center justify-center bg-[#0b111a] bg-gradient-to-br from-[#0f1419] to-[#111827] px-4">
        <div className="max-w-sm w-full p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-blue-600/30 relative animate-softEnter">
          {/* Glassmorphic border highlight */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10"></div>

          <h1 className="text-3xl font-extrabold mb-4 text-white select-none">Chat</h1>

          <p className="text-gray-300 mb-1 select-none">
            Enter your username to continue
          </p>
          <p className="text-gray-400 mb-6 text-sm select-none">
            Use a unique name (letters + numbers)
          </p>

          <input
            autoFocus
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleJoin();
            }}
            placeholder="Username"
            className={`w-full px-4 py-3 rounded-xl bg-transparent border ${
              error ? "border-red-500" : "border-gray-600"
            } placeholder-gray-500 text-white outline-none 
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
            shadow-inner transition duration-300`}
          />

          {error && (
            <p className="mt-2 text-sm text-red-400 select-none">{error}</p>
          )}

          <button
            onClick={handleJoin}
            disabled={isConnecting}
            className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 font-semibold text-white shadow-lg shadow-blue-700/50 hover:scale-105 hover:shadow-blue-900/70 transform transition duration-300 disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center gap-2 select-none"
          >
            {isConnecting ? "Connecting..." : "Join Chat"}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#0f1419] to-[#111827] text-white flex items-center justify-center p-3">
      <div className="w-full max-w-6xl h-full border border-gray-700 bg-[#111] rounded-xl shadow-lg overflow-hidden animate-fadeIn">
        <Chat userId={username} initialOnlineUsers={initialOnlineUsers} />
      </div>
    </div>
  );
}

export default App;