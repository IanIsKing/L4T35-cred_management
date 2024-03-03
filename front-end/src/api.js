// This file contains the functions that make requests to the backend API for user details, mot data, for data see data-layer
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// User section
// -------------------------------- //

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user: ", error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

// Get all the avatars
export const getAvatars = async () => {
  try {
    const response = await axios.get(`/avatars`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch avatars:", error);
    throw error;
  }
};

// Get all the users
export const listUsers = async (authToken) => {
  try {
    const response = await axios.get(`/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user: ", error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

// update a user
export const updateUser = async (userData, authToken) => {
  try {
    const response = await axios.put(`/users/${userData._id}`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user: ", error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  const response = await fetch(`/users/${userId}`, {
    method: "DELETE",
  });
  return response.json();
};

// Get a user by id
export const getUser = async (userId) => {
  const response = await fetch(`/users/${userId}`);
  return response.json();
};

// Login
export const loginAPI = async (userData) => {
  try {
    const response = await axios.post(`/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response);
    throw error.response.data; // This ensures you pass back the server's response error
  }
};

// Verify token
export const verifyToken = async () => {
  const response = await fetch(`/verifyToken`);
  return response.json();
};

// get all divisions
export const listDivisions = async () => {
  try {
    const response = await fetch(`/divisions/all`);
    return response.json();
  } catch (error) {
    console.error("Error listing divisions:", error);
    throw error.response.data; // This ensures you pass back the server's response error
  }
};
