// features/projectsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await axios.get('http://localhost:5001/api/projects'); // Your API endpoint
    return response.data;
  }
);
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (newProject: {
    name: string;
    type: string;
    members: string[];
    description: string;
  }) => {
    const response = await axios.post(
      'http://localhost:5001/api/projects',
      newProject
    ); // Your API endpoint
    return response.data;
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [] as Array<{
      name: string;
      type: string;
      members: string[];
      description: string;
    }>,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default projectsSlice.reducer;
