// Data layer for divisions related operations
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// Get all divisions
export const getDivisions = async (authToken) => {
  try {
    const response = await axios.get("/divisions/all", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch divisions:", error);
    throw error;
  }
};

// Create a new division
export const createDivision = async (data, authToken) => {
  try {
    const response = await axios.post("/divisions/create", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create division:", error);
    throw error;
  }
};

// Update a division
export const getDivision = async (id, authToken) => {
  try {
    const response = await axios.get(`/divisions/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch division:", error);
    throw error;
  }
};
