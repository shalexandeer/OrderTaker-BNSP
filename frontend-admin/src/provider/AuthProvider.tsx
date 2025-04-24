import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { returnBackLinkState } from "../store/ui_recoil"; // Import the returnBackLink state
import { setAuthLocalStorageData } from "../utils/storage";
import { userState } from "../store/user_recoil";
import axiosInstance from "@/services/axiosInstance";
import { isTokenExpired } from "@/utils/auth";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  token: string;
  user: User;
  login: (data: AuthData) => void;
  logout: () => void;
  updateProfileAuth: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const [returnBackLink, setReturnBackLink] = useRecoilState(returnBackLinkState);
  const [token, setToken] = useState<string>(localStorage.getItem("access_token") || "");

  // Effect to handle token validation and refresh
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        if (isTokenExpired(token)) {
          logout();
        }
      }
    };

    validateToken();
  }, [token]);

  const login = async (data: AuthData) => {
    const { accessToken, refreshToken } = data;

    setToken(accessToken); // Set token
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    try {
      const response = await axiosInstance.get(`/account/user-info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        setUser(response.data.data);
        setAuthLocalStorageData(
          "set",
          JSON.stringify(response.data.data),
          refreshToken,
          accessToken,
        );
      }
    } catch (error) {
      console.error("Error while fetching user info:", error);
    }

    if (returnBackLink) {
      setReturnBackLink("");
      window.location.href = returnBackLink;
    } else {
      window.location.href = "/";
    }
  };

  const updateProfileAuth = (data: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const logout = () => {
    setUser({
      id: "",
      username: "",
      role: "",
      nickName: "",
      image: "",
      accountStatus: "",
      cashCoin: 0,
      eventPoint: 0,
      email: "",
    });
    setToken("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuthLocalStorageData("remove");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateProfileAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;