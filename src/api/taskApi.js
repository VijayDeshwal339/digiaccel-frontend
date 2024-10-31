import axios from 'axios';

const API_URL = 'https://digiaccel-backend-1v9h.onrender.com/api/tasks';

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

