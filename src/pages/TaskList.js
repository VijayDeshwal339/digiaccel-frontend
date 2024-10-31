import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '../assests/Delete.png';
import EditIcon from '../assests/edit.png';
import { fetchTasks, toggleTaskStatus, deleteTask } from '../features/slice/taskSlice';

const TaskList = ({ setShowEditTask, setEditTaskid }) => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks: {error}</p>;

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId)).then(() => {
      dispatch(fetchTasks());
    });
  };

  // Log tasks to check for duplicates
 

  return (
    <div className='flex flex-col mt-[25px]'>
      <div className='flex items-center justify-between'>
        <p className='font-poppins font-semibold text-lg leading-[27px]'>Tasks Today</p>
        <p className='font-poppins font-medium text-sm leading-[21px] text-[#4566EC]'>View All</p>
      </div>

      <div className='flex flex-col gap-[22px] mt-[20px]'>
        {tasks.map((task, index) => (
          <div key={task._id || index} className='flex flex-col gap-[22px]'>
            <div className='flex items-center gap-3'>
              <input
                type='checkbox'
                className='w-[20px] h-[20px]'
                checked={task.status === 'true'}
                onChange={() => dispatch(toggleTaskStatus(task._id))}
              />
              <div className='flex w-full items-center justify-between'>
                <p className={task.status === 'true' ? 'line-through text-gray-400' : ''}>{task.title}</p>
                <div className='flex gap-3'>
                  <img
                    src={DeleteIcon}
                    alt='Delete'
                    className='cursor-pointer'
                    onClick={() => handleDelete(task._id)}
                  />
                  <img
                    src={EditIcon}
                    alt='Edit'
                    className='cursor-pointer'
                    onClick={() => {
                      setShowEditTask(true);
                      setEditTaskid(task._id);
                      console.log(task._id);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr className='border-2 w-[306px] self-end' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;


