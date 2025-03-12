import axios from 'axios';


// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:4003/users");
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get a single user
export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4003/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:4003/', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (id, userData) => {
  try {
    const response = await axios.put(`http://localhost:4003/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4003/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
