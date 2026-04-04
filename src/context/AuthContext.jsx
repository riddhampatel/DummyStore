import { createContext, useMemo, useState } from "react";
import { loginWithEmail } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [authLoading, setAuthLoading] = useState(false);

  const login = async (email, password) => {
    setAuthLoading(true);

    try {
      const res = await loginWithEmail(email, password);
      const authToken = res.accessToken || res.token;

      if (!authToken) {
        return {
          success: false,
          error: "Login succeeded but no auth token was returned.",
        };
      }

      localStorage.setItem("token", authToken);
      setToken(authToken);
      return { success: true, error: "" };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Invalid credentials",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      authLoading,
      login,
      logout,
    }),
    [token, authLoading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};