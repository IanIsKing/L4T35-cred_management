// This component is a reusable multi-select dropdown component that can be used to select multiple options from a list of options.
//It is used in the AddProject and AddTask components to select multiple users for a project or task.
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../App.css";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

//The component takes in the following props: caption, options, selectedOptions, setSelectedOptions, and selectionType.
//The caption prop is a string that represents the label for the dropdown.
//The options prop is an array of objects that contains the options to be displayed in the dropdown.
//The selectedOptions prop is an array of objects that contains the options that have been selected.
//The setSelectedOptions prop is a function that is used to set the selectedOptions state in the parent component's state.
//The selectionType prop is a string that represents the type of selection (e.g., "users", "divisions", "OUs").
const MultiSelectDropdown = ({
  caption,
  options,
  selectedOptions,
  setSelectedOptions,
  selectionType, // Add this prop
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // This function is called when the user selects or deselects an option in the dropdown.
  const handleOptionChange = (event) => {
    const optionId = event.target.value;
    const isChecked = event.target.checked;
    const selectedOption = options.find((option) => option._id === optionId);
    setIsOpen(false);

    if (isChecked) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [selectionType]: [...prevOptions[selectionType], selectedOption],
      }));
    } else {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [selectionType]: prevOptions[selectionType].filter(
          (option) => option._id !== optionId
        ),
      }));
    }
  };

  // This function is called when the user clicks the remove button next to a selected option.
  const handleRemoveOption = (optionId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [selectionType]: prevOptions[selectionType].filter(
        (option) => option._id !== optionId
      ),
    }));
  };

  return (
    <>
      <MDBRow style={{ padding: "3px" }}>
        <MDBCol md="6">
          <div className={`dropdown ${isOpen ? "show" : ""}`}>
            <button
              style={{ width: "100%" }}
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="multiSelectDropdown"
              onClick={toggleDropdown}
            >
              {caption}
            </button>
            <div
              style={{ width: "100%" }}
              className={`dropdown-menu ${isOpen ? "show" : ""}`}
              aria-labelledby="multiSelectDropdown"
            >
              {options.map((option) => (
                <Form.Check
                  style={{ marginLeft: "5%" }}
                  key={option._id}
                  type="checkbox"
                  id={`option_${option._id}`}
                  label={option.name || option.email}
                  checked={selectedOptions.some(
                    (selected) => selected._id === option._id
                  )}
                  onChange={handleOptionChange}
                  value={option._id}
                />
              ))}
            </div>
          </div>
        </MDBCol>
        <MDBCol md="6">
          <div className="selection-box">
            {selectedOptions.map((option) => (
              <div key={option._id} className="selection-tag">
                {option.name || option.email}
                <div
                  className="remove-tag"
                  onClick={() => handleRemoveOption(option._id)}
                >
                  ×
                </div>
              </div>
            ))}
          </div>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default MultiSelectDropdown;
