// Data layer for OUs related operations
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// Get all OUs
export const getOUs = async (authToken) => {
  try {
    const response = await axios.get("/ous/all", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch OUs:", error);
    throw error;
  }
};

// Create a new OU
export const createOU = async (data, authToken) => {
  try {
    const response = await axios.post("/ous/create", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create OU:", error);
    throw error;
  }
};
