import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:3000/api/auth'; // Replace with your backend URL

// Register API call
export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        toast.success('Registration successful!'); // Toast for success
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        toast.error('Registration failed. Please try again.'); // Toast for error
        throw error; // Rethrow the error if you want to handle it further up
    }
};

// Login API call
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log('Login response:', response); // You can adjust this log as needed
        toast.success('Login successful!'); // Toast for success
        return response.data;
    } catch (error:any) {
        console.error('Error during login:', error);
        toast.error(error.response.data.message ||'Login failed. Please check your credentials.'); // Toast for error
        throw error; // Rethrow the error if you want to handle it further up
    }
};

// Verify Email API call
export const verifyEmail = async (id: string, token: string, code: string) => {
    try {
        const response = await axios.post(`${API_URL}/verify-email`, { id, token, code });
        toast.success('Email verified successfully!'); // Toast for success
        return response.data;
    } catch (error) {
        console.error('Error during email verification:', error);
        toast.error('Email verification failed. Please try again.'); // Toast for error
        throw error; // Rethrow the error if you want to handle it further up
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`); // Assuming you have a POST endpoint for logout
        toast.success('Logged out successfully!'); // Toast for success
        return response.data;
    } catch (error: any) {
        console.error('Error during logout:', error);
        toast.error('Logout failed. Please try again.'); // Toast for error
        throw error; // Rethrow the error if you want to handle it further up
    }
};
