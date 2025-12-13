import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../middleware/api";

// Create Submission
export const createSubmission = createAsyncThunk(
  "submission/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/submissions", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get My Submissions
export const getMySubmissions = createAsyncThunk(
  "submission/getMy",
  async ({ status } = {}, { rejectWithValue }) => {
    try {
      
      const query = status && status !== "All" ? `?status=${status}` : "";

      const res = await api.get(`/submissions/my-list${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);;

export const fetchAllSubmissions = createAsyncThunk(
  "submission/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/submissions/my-all-list");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Download Submission
export const downloadSubmission = createAsyncThunk(
  "submission/download",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/submissions/${id}/download`);
      return { id, file: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Submission
export const deleteSubmission = createAsyncThunk(
  "submission/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/submissions/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Submission (for re-submit or edit)
export const updateSubmission = createAsyncThunk(
  "submission/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/submissions/${id}`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Resubmit Submission
export const resubmitSubmission = createAsyncThunk(
  "submission/resubmit",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.put(`/submissions/${id}/resubmit`);
      return res.data.submission;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const submissionSlice = createSlice({
  name: "submission",
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder

      .addCase(createSubmission.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMySubmissions.pending, (state) => {
        state.loading = true;
        state.error=true;
      })
      .addCase(getMySubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getMySubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllSubmissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteSubmission.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubmission.fulfilled, (state, action) => {
        const data = action.payload;
        if (data.submission) {
          // Soft delete: update in state
          const index = state.list.findIndex( (s) => s._id === data.submission._id);
        if (index !== -1) state.list[index] = data.submission;
        } 
        else if (data.id) {
          // Permanent delete: remove from state
          state.list = state.list.filter((s) => s._id !== data.id);
        }
      })

      .addCase(deleteSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSubmission.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })

      .addCase(resubmitSubmission.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex((item) => item._id === updated._id);

        if (index !== -1) {
          state.list[index] = updated;
        }
      });
  },
});
export const { clearCurrent } = submissionSlice.actions;
export default submissionSlice.reducer;
