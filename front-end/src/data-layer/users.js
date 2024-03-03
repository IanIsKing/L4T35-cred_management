// Data layer for users related operations
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// Get all users
export const getUsers = async (authToken) => {
  try {
    const response = await axios.get("/users", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};
