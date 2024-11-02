import React from 'react';
import Plus1 from '../assests/Plus1.png';
import { useDispatch } from 'react-redux';
import {  toggleTaskStatus } from '../features/slice/taskSlice';

const TaskPopup = ({ tasks, closePopup }) => {
    const dispatch = useDispatch();


  const currentWeekTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date); 
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    return taskDate >= startOfWeek && taskDate < endOfWeek;
  });
  console.log(currentWeekTasks)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-[90%] sm:w-[400px]">
        <div className='flex items-center justify-between'>
        <h2 className="font-poppins font-semibold text-lg">Tasks for Current Week</h2>
        <button onClick={closePopup} className="text-red-500"><img src={Plus1} alt="Close" className="w-[24px] h-[24px] " /></button>
        </div>
        <div className="mt-2">
          {currentWeekTasks.length > 0 ? (
            <ul>
              {currentWeekTasks.map((task) => (
                <li key={task.id} className="py-2 border-b flex items-center gap-2">
                    <input type='checkbox'  checked={task.status === 'true'} onChange={() => dispatch(toggleTaskStatus(task._id))}/>
                  {task.title} 
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this week.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
