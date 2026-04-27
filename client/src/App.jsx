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

  // LOGIN SCREEN
  if (!username) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1419] to-[#111827] text-white">
        <div className="w-full max-w-sm p-7 bg-[#1a1f2e] border border-gray-700 rounded-xl shadow-lg">
          
          <h1 className="text-2xl font-semibold mb-2 tracking-tight">
            Chat
          </h1>

          <p className="text-sm text-gray-400 mb-4">
            Enter your username to continue
          </p>

          <p className="text-xs text-gray-500 mb-6">
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
            className="w-full px-3 py-2.5 rounded-md bg-[#0c111b] border border-gray-600/80 focus:border-blue-500 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
          />

          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}

          <button
            onClick={handleJoin}
            disabled={isConnecting}
            className="mt-5 w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 transition disabled:opacity-50 font-medium"
          >
            {isConnecting ? "Connecting..." : "Join Chat"}
          </button>
        </div>
      </div>
    );
  }

  // CHAT SCREEN
  return (
    <div className="h-screen bg-gradient-to-br from-[#0f1419] to-[#111827] text-white flex items-center justify-center p-3">
      <div className="w-full max-w-6xl h-full border border-gray-700 bg-[#111] rounded-xl shadow-lg overflow-hidden">
        
        <Chat 
          userId={username} 
          initialOnlineUsers={initialOnlineUsers} 
        />

      </div>
    </div>
  );
}

export default App;