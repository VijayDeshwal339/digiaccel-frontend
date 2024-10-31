// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchTasks as fetchTasksApi, deleteTask as deleteTaskApi, updateTask as updateTaskApi } from '../../api/taskApi';

// const initialState = {
//   tasks: [],
//   loading: false,
//   error: null,
// };

// // Thunks for fetching, adding, deleting, editing, and updating tasks
// export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
//   const tasks = await fetchTasksApi();
//   return tasks;
// });

// export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
//   const response = await fetch('http://localhost:5000/api/tasks', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(task),
//   });
//   return response.json();
// });

// export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
//   await deleteTaskApi(taskId);
//   return taskId;
// });

// export const editTask = createAsyncThunk('tasks/editTask', async ({ id, newTitle }) => {
//   const updatedTask = await updateTaskApi(id, { title: newTitle });
//   return updatedTask;
// });

// export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updatedTask }) => {
//   const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updatedTask),
//   });
//   return response.json();
// });
// // Toggle Task Status
// export const toggleTaskStatus = createAsyncThunk('tasks/toggleTaskStatus', async (taskId) => {
//   const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/toggle-status`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//   });
//   return response.json(); // This should return the updated task
// });


// // Slice definition
// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     toggleTask: (state, action) => {
//       const task = state.tasks.find((task) => task.id === action.payload);
//       if (task) {
//         task.status = task.status === 'true' ? 'true' : 'false';
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle fetchTasks
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tasks = action.payload;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Handle addTask
//       .addCase(addTask.fulfilled, (state, action) => {
//         state.tasks.push(action.payload);
//       })
//       // Handle deleteTask
//       .addCase(deleteTask.fulfilled, (state, action) => {
//         state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//       })
//       // Handle editTask
//       .addCase(editTask.fulfilled, (state, action) => {
//         const index = state.tasks.findIndex((task) => task.id === action.payload.id);
//         if (index !== -1) {
//           state.tasks[index] = action.payload;
//         }
//       })
//       // Handle updateTask
//       .addCase(updateTask.fulfilled, (state, action) => {
//         const index = state.tasks.findIndex((task) => task.id === action.payload.id);
//         if (index !== -1) {
//           state.tasks[index] = action.payload;
//         }
//       });
//   },
// });

// // Export actions and reducer
// export const { toggleTask } = taskSlice.actions;
// export default taskSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks as fetchTasksApi, deleteTask as deleteTaskApi, updateTask as updateTaskApi } from '../../api/taskApi';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Thunks for fetching, adding, deleting, editing, and updating tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const tasks = await fetchTasksApi();
  return tasks; // Ensure tasks returned have unique _id
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await deleteTaskApi(taskId);
  return taskId; // Return the ID to filter out from the state
});

export const editTask = createAsyncThunk('tasks/editTask', async ({ id, newTitle }) => {
  const updatedTask = await updateTaskApi(id, { title: newTitle });
  return updatedTask; // Make sure this returns the updated task with _id
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updatedTask }) => {
  const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });
  return response.json(); // Should return the updated task
});

// Toggle Task Status
export const toggleTaskStatus = createAsyncThunk('tasks/toggleTaskStatus', async (taskId) => {
  const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/toggle-status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json(); // Ensure this returns the updated task with _id
});

// Slice definition
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task._id === action.payload); // Changed to _id
      if (task) {
        task.status = task.status === 'true' ? 'false' : 'true'; // Toggle status
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
      // Handle editTask
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id); // Changed to _id
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
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
      });
  },
});

// Export actions and reducer
export const { toggleTask } = taskSlice.actions;
export default taskSlice.reducer;
