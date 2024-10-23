import React, { useEffect, useState } from 'react';

const TimeComponent: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const now = new Date().toLocaleTimeString();
    setTime(now);
  }, []);

  return <div>The current time is: {time}</div>;
};

export default TimeComponent;
