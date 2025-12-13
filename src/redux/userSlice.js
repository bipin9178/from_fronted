import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../middleware/api";

// Register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (formData, {rejectWithValue}) => {
    try {
      const res = await api.post("/register", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, {rejectWithValue}) => {
    try {
      const res = await api.post("/login", formData);

      // Save token
      localStorage.setItem("token", res.data.user.token);

      return res.data.user;
    } 
    catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Load User From LocalStorage (Refresh)
export const loadUserFromStorage = createAsyncThunk(
  "user/load",
  async (_, ) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const res = await api.get("/profile"); 
      return res.data;  
    } catch (err) {
      return null;
    }
  }
);

// Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  "user/profile",
  async (_, {rejectWithValue}) => {
    try {
      const res = await api.get("/profile"); 
      return res.data;
    } catch (err) {
      return rejectWithValue("Unauthorized");
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    profile: null,
    loading: false,
    error: null,
    message: "",
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Registration successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload) {
          state.userInfo = {
            id: action.payload.id,
            username: action.payload.username,
            email: action.payload.email,
          };
        }
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
