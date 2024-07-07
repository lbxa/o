import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import type { PropsWithChildren } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRelayEnvironment } from "react-relay";
import { RecordSource } from "relay-runtime";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (tok: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState<any | null>(null);
  const environment = useRelayEnvironment();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = SecureStore.getItem("ACCESS_TOKEN");
      if (token) {
        setIsAuthenticated(true);
        // You might want to fetch user data here and set it with setUser
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (tok: string) => {
    try {
      // const userData = await authLogin(email, password);
      // setUser(userData);
      SecureStore.setItem("ACCESS_TOKEN", tok);
      setIsAuthenticated(true);
      router.replace("(app)/home");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // setUser(null);
      setIsAuthenticated(false);
      environment.getStore().publish(new RecordSource());
      await SecureStore.deleteItemAsync("ACCESS_TOKEN");
      await SecureStore.deleteItemAsync("REFRESH_TOKEN");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
