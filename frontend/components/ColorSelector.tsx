import React, { useState } from 'react';

const colors = ['#101204', '#3b82f6', '#ef4444', '#22c55e', '#a855f7']; // Blue, Red, Green, Purple

const ColorSelector = ({
  onColorSelect,
}: {
  onColorSelect: (color: string) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorSelect(color); // Call the parent function to handle color selection
  };
  return (
    <div className='flex gap-2'>
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => handleColorClick(color)}
          className={`w-8 h-8 cursor-pointer rounded ${
            selectedColor === color ? `ring-2 ring-[${selectedColor}]` : ''
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
