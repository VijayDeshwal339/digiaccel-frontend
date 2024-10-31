import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css'; 

const WeeklyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(selectedDate);

  return (
    <div className="weekly-calendar flex justify-center items-center mt-[23px]">
      <div className="flex gap-[10px]">
        {weekDays.map((date, index) => {
          const isSelected = date.getDate() === selectedDate.getDate();
          return (
            <div
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`day ${isSelected ? 'selected' : ''}`}
            >
              <span className="font-poppins font-normal text-[10px] leading-[22px] text-center">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className="font-poppins font-medium text-sm leading-[22px] text-center">{date.getDate()}</span>
              {isSelected && <div className="w-[4px] h-[4px] bg-white rounded-full mt-[2px]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;