'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const events = [
  {
    date: '2024-10-08',
    title: 'Marketing Strategy Meeting.',
    description: 'Plan the marketing strategy for Q4.',
  },
  {
    date: '2024-10-09',
    title: 'Risk Assessment Review.',
    description: 'Evaluate potential project risks.',
  },
  {
    date: '2024-10-10',
    title: 'Design Review.',
    description: 'Review the latest design mockups.',
  },
  {
    date: '2024-10-11',
    title: 'Team Building Activity.',
    description: 'Fun activities to strengthen team bonds.',
  },
  {
    date: '2024-10-12',
    title: 'Vendor Negotiation.',
    description: 'Negotiate terms with potential vendors.',
  },
  {
    date: '2024-10-07',
    title: 'Kickoff Meeting.',
    description: 'Initial project kickoff with stakeholders.',
  },
  {
    date: '2024-10-13',
    title: 'Conference Preparation.',
    description: 'Prepare for the upcoming industry conference.',
  },
];

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const days = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);

    // Get previous month's details
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonthDays = daysInMonth(prevMonth, prevMonthYear); // Get next month's details
    const totalDaysDisplayed = 42; // 6 weeks (6 * 7 = 42)
    const totalDaysInCalendar = totalDaysDisplayed - firstDay - days;

    const calendarDays = [];

    // Display the last few days of the previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push(
        <div
          className='bg-gray-600 p-4 rounded-lg relative text-gray-400'
          key={`prev-${prevMonthDays - i}`}
        >
          <div>{prevMonthDays - i}</div>
        </div>
      );
    }

    // Display the days of the current month
    for (let day = 1; day <= days; day++) {
      const dateString = `${year}-${String(month + 1).padStart(
        2,
        '0'
      )}-${String(day).padStart(2, '0')}`;
      const event = events.find((event) => event.date === dateString);
      calendarDays.push(
        <div className='bg-gray-800 p-4 rounded-lg relative' key={day}>
          <div className='text-white font-bold'>{day}</div>
          {event && (
            <div
              className='bg-gray-700 text-white p-2 mt-2 overflow-hidden w-full text-ellipsis whitespace-nowrap'
              title={event.description}
            >
              {event.title}
            </div>
          )}
        </div>
      );
    }

    // Display the first few days of the next month
    for (let i = 1; i <= totalDaysInCalendar; i++) {
      calendarDays.push(
        <div
          className='bg-gray-600 p-4 rounded-lg relative text-gray-400'
          key={`next-${i}`}
        >
          <div>{i}</div>
        </div>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  return (
    <div className='bg-gray-900 text-white p-6 h-full'>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Event Schedule</h1>
        <div className='flex items-center'>
          <button
            className='bg-gray-700 px-3 py-1 rounded mr-2'
            onClick={handlePrevMonth}
          >
            <ChevronLeft />
          </button>
          <span>
            {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
            {currentMonth.getFullYear()}
          </span>
          <button
            className='bg-gray-700 px-3 py-1 rounded ml-2'
            onClick={handleNextMonth}
          >
            <ChevronRight />
          </button>
        </div>
      </header>
      <div className='grid grid-cols-7 text-center mb-2'>
        {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
          <div className='font-bold' key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-2 h-4/5'>{renderCalendar()}</div>
    </div>
  );
};

export default CustomCalendar;
