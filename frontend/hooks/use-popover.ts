import { useState, useEffect, useRef } from 'react';

const usePopover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { isPopoverOpen, togglePopover, popoverRef, setIsPopoverOpen };
};

export default usePopover;
