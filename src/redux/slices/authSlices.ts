import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, verifyEmail } from '../../api/api';

// Define the state structure
interface AuthState {
    isAuthenticated: boolean;
    user: null | { _id:string;name: string; email: string };
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

// Async actions for register, login, and verify email
export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }: { name: string; email: string; password: string }, thunkAPI) => {
        try {
            const response = await registerUser(name, email, password);
            return response.user; // Assuming the response contains user data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Registration failed');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await loginUser(email, password);
            return response.user; // Assuming the response contains user data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Login failed');
        }
    }
);

export const verifyUserEmail = createAsyncThunk(
    'auth/verifyEmail',
    async ({ id, token, code }: { id: string; token: string; code: string }, thunkAPI) => {
        try {
            const response = await verifyEmail(id, token, code);
            return response.data; // Assuming the response contains a success message
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Verification failed');
        }
    }
);

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Optional logout action
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action: PayloadAction<{ _id:string; name: string; email: string }>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<{ _id:string; name: string; email: string }>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Verify Email
        builder.addCase(verifyUserEmail.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(verifyUserEmail.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(verifyUserEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
