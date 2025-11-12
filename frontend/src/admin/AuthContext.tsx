import React, { createContext, useContext, useEffect, useState } from "react";
import { verifyKey } from "./http";

type AuthContextType = {
  apiKey: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (key: string) => Promise<boolean>;
  logout: () => void;
};
type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const savedApiKey = sessionStorage.getItem("API_KEY");
    if (savedApiKey) setApiKey(savedApiKey);
    setLoading(false);
  }, []);
  const login = async (key: string) => {
    const correct = await verifyKey(key);
    if (correct) {
      sessionStorage.setItem("API_KEY", key);
      setApiKey(key);
    }
    return correct;
  };
  const logout = () => {
    setApiKey(null);
    sessionStorage.removeItem("API_KEY");
  };

  return (
    <AuthContext.Provider
      value={{ apiKey, isLoggedIn: !!apiKey, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
