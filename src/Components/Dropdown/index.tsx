"use client"

import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import "./index.css";
import { MdArrowDropDown } from "react-icons/md";

export interface IOption {
  value: string;
  label: string;
}

export interface IDropdown {
  register?: UseFormRegister<any>;
  label: string;
  options: IOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  error?: string;
  id: string;
  borderColor?: string;
  labelColor?: string;
  size?: "small" | "medium" | "large";
  isRtl?: boolean;
  required?: boolean;
}

const Dropdown: React.FC<IDropdown> = ({
  label,
  options,
  onSelect,
  placeholder = "یک مورد را انتخاب کنید",
  error,
  id,
  register,
  borderColor = "#000000",
  labelColor = "#4b5563",
  size,
  isRtl = true,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSelectOption = (option: IOption) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const wrapperClass = `dropdown-wrapper ${size || ""}`;

  return (
    <div dir={isRtl ? "rtl" : ""} className={wrapperClass}>
      <label
        className={`dropdown-label ${error ? "error" : ""}`}
        htmlFor={id}
        style={{ color: labelColor }}
      >
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <div className="custom-dropdown">
        <div
          style={{ borderColor: borderColor }}
          className={`dropdown-select ${isOpen ? "open" : ""} ${
            error ? "error" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="selected-option">
            {selectedOption ? selectedOption.label : placeholder}
            <MdArrowDropDown />
          </div>
          {register && ( // Check if register is provided
            <select
              id={id}
              style={{ display: "none" }} // Hide the select element
              {...register(id, { required })} // Register the select element with react-hook-form
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
        {isOpen && (
          <div className="options-container">
            <input
              type="text"
              placeholder="جستجو ..."
              className="dropdown-search"
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="dropdown-options">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="dropdown-option"
                  onClick={() => handleSelectOption(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="dropdown-error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
