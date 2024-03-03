// Auth context to handle user authentication of the application
// This context provides the following functionality:
// - Login
// - Logout
// - Verify user
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { loginAPI } from "../api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// The AuthProvider component is a wrapper for the entire application that provides the AuthContext to all components in the application.
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  // This function is called when the component is first rendered and is used to verify the user's token.
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await axios.get("/verifyToken");
          setCurrentUser(response.data.user); // Ensure your backend sends back user data here
          setAuthToken(token);
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  // This function is called when the user submits the login form.
  const login = async (userData) => {
    try {
      // Call login from api.js
      const data = await loginAPI(userData);
      // Store the token
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      setCurrentUser({ ...data.user });
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    } catch (error) {
      // Handle error (e.g., show feedback to the user)
      throw error;
    }
  };

  // This function is called when the user clicks the logout button.
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout };

  return (
    <AuthContext.Provider value={value} authToken={authToken}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
