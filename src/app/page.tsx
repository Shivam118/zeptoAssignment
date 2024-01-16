"use client";
// Import necessary modules
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Avatar from 'react-avatar';

interface DropdownItem {
  id: string;
  label: string;
}

interface Chip {
  id: string;
  label: string;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const list = [
    { id: '1', label: 'nick@gmail.com' },
    { id: '2', label: 'john@yahoo.com' },
    { id: '3', label: 'joey@gmail.com' },
    { id: '4', label: 'monica@rediffmail.com' },
    { id: '5', label: 'rachel@hotmail.com' },
    { id: '6', label: 'phoebe@gmail.com' },
    { id: '7', label: 'chandler@funmail.com' },
    { id: '8', label: 'barry@yahoo.com' },
    { id: '9', label: 'mindy@gmail.com' },
    { id: '10', label: 'kurt@gmail.com' },
  ];
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusedDropDown, setFocusedDropDown] = useState<DropdownItem[]>([]);

  useEffect(() => {
    const handleBackspace = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Backspace' && inputValue === '') {
        const lastChip = chips[chips.length - 1];
        if (lastChip) {
          removeChip(lastChip);
        }
        setFocusedDropDown(list);
      }
    };

    if (inputValue !== '') {
      setFocusedDropDown(list.filter(item => item.label.includes(inputValue)));
    }

    document.addEventListener('keydown', handleBackspace);
    return () => {
      document.removeEventListener('keydown', handleBackspace);
    };
  }, [inputValue, chips]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const addChip = (item: DropdownItem) => {
    const newChip: Chip = { id: item.id, label: item.label };
    setChips([...chips, newChip]);
    setInputValue('');
    setFocusedDropDown(focusedDropDown.filter(dropItem => dropItem.id !== item.id));
  };

  const removeChip = (chip: Chip) => {
    setChips(chips.filter(existingChip => existingChip !== chip));
    setFocusedDropDown([...focusedDropDown, { id: chip.id, label: chip.label }]);
  };

  return (
    <div className="flex flex-col items-center mt-8 relative w-full">
      <h1 className='text-3xl font-bold text-purple-700'>Pick Users</h1>
      <br />
      <br />
      <br />
      <div className="relative border-b-2 border-purple-800 w-6/12"
        onClick={() => setFocused(true)}
        onBlur={() => setTimeout(() => {
          setFocused(false)
        }, 250)}
      >
        <div className="flex flex-wrap flex-row">
          {chips.map(chip => (
            <div key={chip.id} className="flex items-center bg-blue-500 text-white p-2 m-1 rounded-full">
              <Avatar name={chip.label} size="20" round />
              <span className="ml-2">{chip.label}</span>
              <button className="ml-2" onClick={() => removeChip(chip)}>
                X
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="p-2 inline border-none outline-none"
            placeholder="Add new user...."
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        {inputValue !== "" ?
          (
            <div className="absolute top-full left-0 w-full border border-gray-300 bg-white rounded mt-1">
              {focusedDropDown.map(item => (
                <div key={item.id} className="p-2 hover:bg-gray-200" onClick={() => addChip(item)}>
                  <Avatar name={item.label} size="20" round />
                  <span className="ml-2">{item.label}</span>
                </div>
              ))}
            </div>
          ) :
          focused && (
            <div className="absolute top-full left-0 w-full border border-gray-300 bg-white rounded mt-1">
              {focusedDropDown.map(item => (
                <div key={item.id} className="p-2 hover:bg-gray-200" onClick={() => addChip(item)}>
                  <Avatar name={item.label} size="20" round />
                  <span className="ml-2">{item.label}</span>
                </div>
              ))}
            </div>
          )}

      </div>
    </div>
  );
};

export default App;
