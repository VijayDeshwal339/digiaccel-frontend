import React, { useState } from 'react';
import Search from '../assests/Search.png';
import Complete from '../assests/Complete.png';
import Cancel from '../assests/Cancel.png';
import Plus from '../assests/Plus.png';
import AddNewTask from './Addtask';
import TaskList from './TaskList';
import Notif from '../assests/Notif.png';
import Setting from '../assests/Setting.png';
import WeeklyCalendar from './WeeklyCalendar';
import { useSelector } from 'react-redux';

const Home = () => {
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [edittaskid, setEditTaskid] = useState('');
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'true').length;

  const completedPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const toggleAddTask = () => {
    setShowAddTask((prev) => !prev);
    setShowEditTask(false); 
  };

  const toggleEditTask = (taskId) => {
    setShowEditTask(true);
    setEditTaskid(taskId);
    setShowAddTask(false); 
  };

  return (
    // <div className='sm:flex sm:items-center sm:justify-center'>
    <div className='w-[390px] sm:mx-auto flex flex-col px-[26px] py-7 relative'>
      {/* Search and Notification icons */}
      { showAddTask || showEditTask ?  (
      <>
      <div className='flex justify-between items-center h-[47px]'>
      <img src={Setting} alt='' className='w-[24px] h-[24px]' />
      <div className='flex items-center gap-2'>
      <img src={Search} alt='' className='w-[24px] h-[24px]' />
      <img src={Notif} alt='' className='w-[24px] h-[24px]' />
      </div>
      </div>
      </>
    ):
    (
      <>
      <input type='text' placeholder='Search for a task' className='h-[47px] px-5 relative outline-none border border-[#E6E6E6] rounded-[4px] font-light text-xs leading-[18px] text-[#00000099]' />
      <img src={Search} alt='' className='w-[24px] h-[24px] absolute left-[327px] top-[40px]' /> 
     </>
    )
   }

      {/* Weekly Calendar */}
      <WeeklyCalendar />

      {/* Task Summary */}
      <div className='flex gap-4 mt-[30px]'>
        {/* Completed Task */}
        <div className='w-[162px] h-[96px] bg-[#EFF2FF] flex flex-col px-[13px] py-[18px]'>
          <div className='flex items-center gap-[11px]'>
            <div className='w-[28px] h-[28px] flex items-center justify-center bg-[#99ADFF]'>
              <img src={Complete} alt='' className='w-[24px] h-[24px]' />
            </div>
            <p className='font-poppins font-normal text-xs leading-7'>Task Complete</p>
          </div>
          <p className='ml-[39px] font-poppins text-[22px] leading-[33px]'>
          {tasks.filter(task => task.status === 'true').length} <span className='text-[10px] leading-[15px] text-[#6E7180]'>This Week</span>
          </p>
        </div>
        {/* Pending Task */}
        <div className='w-[162px] h-[96px] bg-[#FFE6E7] flex flex-col px-[13px] py-[18px]'>
          <div className='flex items-center gap-[11px]'>
            <div className='w-[28px] h-[28px] flex items-center justify-center bg-[#FFB1B5]'>
              <img src={Cancel} alt='' className='w-[24px] h-[24px]' />
            </div>
            <p className='font-poppins font-normal text-xs leading-7'>Task Pending</p>
          </div>
          <p className='ml-[39px] font-poppins text-[22px] leading-[33px]'>
          {tasks.filter(task => task.status === 'false').length} <span className='text-[10px] leading-[15px] text-[#6E7180]'>This Week</span>
          </p>
        </div>
      </div>

      {/* Weekely Progress */}
      <div className='flex flex-col gap-2 mt-[20px]'>
      <p className='font-poppins font-semibold text-lg leading-[27px]'>Weekly Progress</p>
      <div className='flex bg-[#DADAFF] w-[342px] h-[24px]'>
        <div className=' bg-[#253C98]' style={{ width: `${completedPercentage}%` }} ></div>
      </div>
      </div>

      {/* Task List */}
      <TaskList setShowEditTask={toggleEditTask} setEditTaskid={setEditTaskid} />

      {/* Floating Add Task Button */}
      <div
        onClick={toggleAddTask}
        className='w-[76px] h-[76px] bg-[#4566EC] rounded-full self-center flex items-center justify-center mt-[38px] cursor-pointer'
      >
        <img src={Plus} alt='' className='w-[32.57px] h-[32.57px]' />
      </div>

      {/* AddNewTask Component */}
      {(showAddTask || showEditTask) && (
        <div className='fixed xs:inset-x-0  sm:inset-x-auto  bottom-0 bg-white shadow-lg rounded-t-lg transition-transform transform translate-y-full animate-slide-up'>
          <AddNewTask
            closeTask={toggleAddTask} 
            edittaskid={showEditTask ? edittaskid : ''}
            closeEditTask={() => setShowEditTask(false)}
          />
        </div>
      )}
    </div>
    // </div>
  );
};

export default Home;
