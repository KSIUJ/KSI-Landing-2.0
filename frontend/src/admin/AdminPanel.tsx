import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const AdminPanel = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleLogin = async () => {
    const correct = await login(apiKey);
    if (correct) {
      navigate("/admin/dashboard");
    } else {
      setError("Wrong key");
    }
  };

  return (
    <div className="flex flex-col max-w-6xl justify-center items-center pt-32">
      <input
        type="password"
        placeholder="API_KEY"
        className="border border-slate-700 rounded p-2"
        onChange={handleInput}
      />
      <button
        onClick={handleLogin}
        className="bg-slate-600 rounded-xl hover:bg-slate-700 mt-2   px-5 text-white mb-4"
      >
        Login
      </button>
    </div>
  );
};

export default AdminPanel;
