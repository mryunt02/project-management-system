import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await axios.get('http://localhost:5001/api/projects'); // Your API endpoint
    return response.data;
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (projectId: string) => {
    const response = await axios.get(
      `http://localhost:5001/api/projects/${projectId}`
    ); // Your API endpoint
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

export const addListToProject = createAsyncThunk(
  'projects/addListToProject',
  async ({
    projectId,
    newList,
  }: {
    projectId: string;
    newList: {
      _id: string;
      name: string;
      color: string;
      events: Array<{ _id: string; title: string; description: string }>;
    };
  }) => {
    const response = await axios.post(
      `http://localhost:5001/api/projects/${projectId}/lists`,
      newList
    ); // Your API endpoint
    return response.data;
  }
);

export const updateListInProject = createAsyncThunk(
  'projects/updateListInProject',
  async ({
    projectId,
    listId,
    updatedList,
  }: {
    projectId: string;
    listId: string;
    updatedList: {
      name: string;
      color: string;
    };
  }) => {
    const response = await axios.put(
      `http://localhost:5001/api/projects/${projectId}/lists/${listId}`,
      updatedList
    ); // Your API endpoint
    return response.data;
  }
);

export const updateEventInList = createAsyncThunk(
  'projects/updateEventInList',
  async ({
    projectId,
    listId,
    eventId,
    updatedEvent,
  }: {
    projectId: string;
    listId: string;
    eventId: string;
    updatedEvent: {
      title: string;
      description: string;
      attendees: string[];
    };
  }) => {
    const response = await axios.put(
      `http://localhost:5001/api/projects/${projectId}/lists/${listId}/events/${eventId}`,
      updatedEvent
    ); // Your API endpoint
    return response.data;
  }
);

export const deleteListFromProject = createAsyncThunk(
  'projects/deleteListFromProject',
  async ({ projectId, listId }: { projectId: string; listId: string }) => {
    const response = await axios.delete(
      `http://localhost:5001/api/projects/${projectId}/lists/${listId}`
    ); // Your API endpoint
    return response.data; // Assuming the response contains the deleted list ID or confirmation
  }
);

export const createEventInList = createAsyncThunk(
  'projects/createEventInList',
  async ({
    projectId,
    listId,
    newEvent,
  }: {
    projectId: string;
    listId: string;
    newEvent: {
      title: string;
      description: string;
      attendees: string[];
    };
  }) => {
    const response = await axios.post(
      `http://localhost:5001/api/projects/${projectId}/lists/${listId}/events`,
      newEvent
    ); // Your API endpoint
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId: string) => {
    await axios.delete(`http://localhost:5001/api/projects/${projectId}`); // Your API endpoint
    return projectId; // Return the project ID for removal from the state
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [] as Array<{
      _id: string;
      name: string;
      type: string;
      members: string[];
      description: string;
      lists: Array<{
        _id: string;
        name: string;
        color: string;
        events: Array<{ _id: string; title: string; description: string }>;
      }>;
    }>,
    selectedProject: null as {
      _id: string;
      name: string;
      type: string;
      members: string[];
      description: string;
      lists: Array<{
        _id: string;
        name: string;
        color: string;
        events: Array<{
          attendees: string[];
          _id: string;
          title: string;
          description: string;
        }>;
      }>;
    } | null,
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
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
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
      })
      .addCase(addListToProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addListToProject.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedProject) {
          state.selectedProject.lists.push(action.payload);
        }
      })
      .addCase(addListToProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(updateEventInList.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEventInList.fulfilled, (state, action) => {
        state.loading = false;
        const { projectId, listId, eventId } = action.meta.arg;
        const project = state.projects.find((p) => p._id === projectId);
        if (project) {
          const list = project.lists.find((l) => l._id === listId);
          if (list) {
            const eventIndex = list.events.findIndex((e) => e._id === eventId);
            if (eventIndex !== -1) {
              list.events[eventIndex] = action.payload; // Update the event
            }
          }
        }
      })
      .addCase(updateEventInList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(updateListInProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateListInProject.fulfilled, (state, action) => {
        state.loading = false;
        const { projectId, listId } = action.meta.arg;
        const project = state.projects.find((p) => p._id === projectId);
        if (project) {
          const list = project.lists.find((l) => l._id === listId);
          if (list) {
            list.name = action.payload.name; // Update the list name
            list.color = action.payload.color; // Update the list color
          }
        }
      })
      .addCase(updateListInProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(deleteListFromProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteListFromProject.fulfilled, (state, action) => {
        state.loading = false;
        const { projectId, listId } = action.meta.arg;
        const project = state.projects.find((p) => p._id === projectId);
        if (project) {
          project.lists = project.lists.filter((l) => l._id !== listId); // Remove the deleted list
        }
      })
      .addCase(deleteListFromProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(createEventInList.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEventInList.fulfilled, (state, action) => {
        state.loading = false;
        const { projectId, listId } = action.meta.arg;
        const project = state.projects.find((p) => p._id === projectId);
        if (project) {
          const list = project.lists.find((l) => l._id === listId);
          if (list) {
            list.events.push(action.payload); // Add the new event to the list
          }
        }
      })
      .addCase(createEventInList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload
        ); // Remove the deleted project
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default projectsSlice.reducer;
