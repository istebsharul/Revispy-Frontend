import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://revispy-backend.vercel.app/api/auth'; // Replace with your backend URL

// Register API call
export const registerUser = async (name: string, email: string, password: string) => {
  return toast.promise(
    axios.post(`${API_URL}/register`, { name, email, password }),
    {
      loading: 'Registering...',
      success: 'Registration successful!',
      error: 'Registration failed. Please try again.',
    }
  )
    .then(response => response.data)
    .catch(error => {
      toast.error(error.response.data.message);
      console.error('Error during registration:', error);
      throw error;
    });
};

// Login API call
export const loginUser = async (email: string, password: string) => {
  return toast.promise(
    axios.post(`${API_URL}/login`, { email, password }),
    {
      loading: 'Logging in...',
      success: 'Login successful!',
      error: (error) => error.response?.data?.message || 'Login failed. Please check your credentials.',
    }
  )
    .then(response => response.data)
    .catch(error => {
      console.error('Error during login:', error);
      throw error;
    });
};

// Verify Email API call
export const verifyEmail = async (id: string, token: string, code: string) => {
  return toast.promise(
    axios.post(`${API_URL}/verify-email`, { id, token, code }),
    {
      loading: 'Verifying email...',
      success: 'Email verified successfully!',
      error: 'Email verification failed. Please try again.',
    }
  )
    .then(response => response.data)
    .catch(error => {
      console.error('Error during email verification:', error);
      throw error;
    });
};

// Logout API call
export const logoutUser = async () => {
  return toast.promise(
    axios.post(`${API_URL}/logout`), // Assuming you have a POST endpoint for logout
    {
      loading: 'Logging out...',
      success: 'Logged out successfully!',
      error: 'Logout failed. Please try again.',
    }
  )
    .then(response => response.data)
    .catch(error => {
      console.error('Error during logout:', error);
      throw error;
    });
};