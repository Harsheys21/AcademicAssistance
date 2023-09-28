import React, { useState } from "react";
import MajorOption from "./ButtonOption";

function DropdownMenu(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = props.options;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onSelect;
    console.log("balls");
  };

  return (
    <div className="dropdown">
      <MajorOption
        onClick={toggleDropdown}
        className="dropdown-toggle"
        text={selectedOption || props.title}
      ></MajorOption>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
