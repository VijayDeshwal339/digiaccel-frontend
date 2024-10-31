// import React from 'react'
// import Ellipse from '../assests/Ellipse.png'
// import Group from '../assests/Group.png'
// import Group1 from '../assests/Group1.png'
// import { Link } from 'react-router-dom'

// const Onboarding = () => {
//   return (
//     <div className='w-[390px] flex flex-col'>
//         <div className='bg-[#5677FF] h-[552px] w-[100%] '>
//          <img src={Ellipse} alt='' className='w-[88px] h-[88px] ml-[302px] opacity-50' />
//          <img src={Group} alt='' className='w-[117.5px] h-[151px] opacity-50 mt-[54px]' />
//          <img src={Group1} alt='' className='w-[117.5px] h-[151px] ml-[272.5px] opacity-50' />
//         </div>
//         <div className='h-[292px] w-[100%] flex flex-col justify-between px-6 py-8'>
//          <div className='flex flex-col gap-2'>
//          <p className='font-poppins font-semibold text-2xl leading-9'>Manage What To Do</p>
//          <p className='font-poppins font-normal text-xs leading-[18px] text-[#717171]'>The best way to manage what you have to do, don't forget your plans</p>
//          </div>

//          <Link to='/home'>
//         <button className='bg-[#4566EC] h-[48px] w-[100%] text-[#FFFFFF]'> Get Started</button>
//         </Link>
//         </div>

//     </div>
//   )
// }

// export default Onboarding

// src/Onboarding.js
import React from 'react';
import Ellipse from '../assests/Ellipse.png'
 import Group from '../assests/Group.png'
import Group1 from '../assests/Group1.png'
import { Link } from 'react-router-dom'

const Onboarding = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[390px] h-[844px] flex flex-col">
        {/* Top Section */}
        <div className="h-[552px] bg-blue-600 relative flex flex-col">
        <div className="absolute right-0 top-0 opacity-80">
          <img src={Ellipse} alt='' className='w-[117.5px] h-[151px] ' />
          </div>
          {/* Zigzag patterns */}
          <div className="absolute left-0 top-32 opacity-80">
          <img src={Group} alt='' className='w-[117.5px] h-[151px] ' />
          </div>
          <div className="absolute bottom-5 right-0 opacity-80">
          <img src={Group1} alt='' className='w-[117.5px] h-[151px]' />
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className='h-[292px] w-[100%] flex flex-col justify-between px-6 py-8'>
          <div className='flex flex-col gap-2'>
          <p className='font-poppins font-semibold text-2xl leading-9'>Manage What To Do</p>
          <p className='font-poppins font-normal text-xs leading-[18px] text-[#717171]'>The best way to manage what you have to do, don't forget your plans</p>
          </div>

          <Link to='/home'>
         <button className='bg-[#4566EC] h-[48px] w-[100%] text-[#FFFFFF]'> Get Started</button>
         </Link>
         </div>
      </div>
    </div>
  );
};

export default Onboarding;
