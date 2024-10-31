import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks as fetchTasksApi, deleteTask as deleteTaskApi} from '../../api/taskApi';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const tasks = await fetchTasksApi();
  return tasks; 
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await fetch('https://digiaccel-backend-1v9h.onrender.com/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await deleteTaskApi(taskId);
  return taskId; 
});


export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updatedTask }) => {
  const response = await fetch(`https://digiaccel-backend-1v9h.onrender.com/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });
  return response.json(); 
});


export const toggleTaskStatus = createAsyncThunk('tasks/toggleTaskStatus', async (taskId) => {
  const response = await fetch(`https://digiaccel-backend-1v9h.onrender.com/api/tasks/${taskId}/toggle-status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json(); 


});

export const searchTasks = createAsyncThunk('tasks/searchTasks', async (keyword) => {
  const response = await fetch(`https://digiaccel-backend-1v9h.onrender.com/api/tasks/search?keyword=${keyword}`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
});


const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task._id === action.payload); 
      if (task) {
        task.status = task.status === 'true' ? 'false' : 'true'; 
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle addTask
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Handle deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload); // Changed to _id
      })
     
      // Handle updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id); // Changed to _id
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Handle toggleTaskStatus
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id); // Changed to _id
        if (index !== -1) {
          state.tasks[index] = updatedTask; // Update the task
        }
      })
      // Handle searchTasks
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload; // Update tasks with the search result
      })
  },
});


export const { toggleTask } = taskSlice.actions;
export default taskSlice.reducer;