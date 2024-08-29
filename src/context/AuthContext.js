"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";

import dpSVG from "../../public/images/icons/dp.svg";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  username: "",
  profilePicture: "",
  uid: "",
});

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, loading] = useAuthState(auth);

  // Handle loading state
  useEffect(() => {
    if (!loading && user) {
      setIsAuthenticated(true);
      localStorage.setItem("isLogged", true);
    }
  }, [loading, user]);

  // console.log(user);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isLogged", true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isLogged");
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        username: user?.displayName,
        profilePicture: user?.photoURL ? user?.photoURL : dpSVG,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
