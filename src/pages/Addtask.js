import React, { useState, useEffect } from 'react';
import Plus1 from '../assests/Plus1.png';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../features/slice/taskSlice';
import axios from 'axios';

const AddNewTask = ({ closeEditTask, edittaskid, closeTask }) => {
  const [tasks, setTasks] = useState();
  const dispatch = useDispatch();

  const fetchTaskbyid = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${edittaskid}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isEdit = Boolean(tasks && tasks._id);

  const [taskTitle, setTaskTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  useEffect(() => {
    if (edittaskid) {
      fetchTaskbyid();
    }
  }, [edittaskid]);

  useEffect(() => {
    if (tasks) {
      setTaskTitle(tasks.title || '');
      setStartTime(tasks.startTime || '');
      setEndTime(tasks.endTime || '');
      setDate(tasks.date ? tasks.date.split('T')[0] : ''); // Extract date in 'yyyy-MM-dd' format
      setDescription(tasks.description || '');
      setPriority(tasks.priority || 'Low');
    }
  }, [tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(`${date}T${endTime}`) <= new Date(`${date}T${startTime}`)) {
      alert("End time must be after start time");
      return;
    }

    const newTask = {
      title: taskTitle,
      description,
      date,
      startTime,
      endTime,
      priority,
    };

    if (isEdit) {
      dispatch(updateTask({ id: tasks._id, updatedTask: newTask }));
    } else {
      dispatch(addTask(newTask));
      closeTask(false);
    }

    closeEditTask(); 
  };

  return (
    <div className="w-[390px] h-[640px] bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{isEdit ? 'Update Task' : 'Create Task'}</h2>
        <img
          src={Plus1}
          alt="Close"
          className="w-[24px] h-[24px] cursor-pointer"
          onClick={isEdit? closeEditTask: closeTask}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Task Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Task Title</label>
          <input
            type="text"
            placeholder="Doing Homework"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Time Inputs */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          ></textarea>
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isEdit ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddNewTask;

