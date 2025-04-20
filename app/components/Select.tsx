"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type SelectProps = {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
};

const Select = ({ options, selected, setSelected }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isOpen) {
      listRef.current?.focus();
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const handleButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === "Space") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    switch (event.code) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex < options.length - 1 ? prevIndex + 1 : 0
        );
        break;

      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : options.length - 1
        );
        break;

      case "Enter":
      case "Space": {
        const selectedOption = options[focusedIndex];
        setSelected(selectedOption);
        setIsOpen(false);
        break;
      }

      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;

      case "Tab":
        event.preventDefault();
        break;
    }
  };

  return (
    <div className="w-1/3 relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onKeyDown={handleButtonKeyDown}
        aria-labelledby="listbox"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 
      text-left border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
      focus:outline-none border-gray-300"
      >
        {selected}
        <ChevronDownIcon
          className={`size-4 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id="listbox"
          role="listbox"
          tabIndex={0}
          onKeyDown={handleListKeyDown}
          aria-activedescendant={`option-${focusedIndex}`}
          className="absolute bg-white mt-2 border rounded-lg 
        border-gray-300 shadow-md w-full overflow-hidden focus:ring-2 
        focus:ring-blue-500 focus:outline-none"
        >
          {options.map((option, index) => (
            <li
              key={option}
              id={`option-${index}`}
              role="option"
              aria-selected={option === selected}
              className={`px-4 py-2 text-left hover:bg-gray-100 cursor-pointer ${
                focusedIndex === index ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
