// Data layer for repositories related operations
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// Get all repositories
export const getRepositories = async (authToken) => {
  try {
    const response = await axios.get("/repositories/all", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    throw error;
  }
};

// Get my repositories
export const getMyRepositories = async (authToken) => {
  try {
    const response = await axios.get("/repositories", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    throw error;
  }
};

// Create a new repository
export const createRepository = async (data, authToken) => {
  try {
    const response = await axios.post("/repositories/create", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create repository:", error);
    throw error;
  }
};

// Update a repository
export const updateRepository = async (data, authToken) => {
  try {
    const response = await axios.put("/repositories", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        id: data._id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update repository:", error);
    throw error;
  }
};
