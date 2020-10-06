import React from 'react';

const ToggleButton = ({handleClick, disabled, name}) => (
  <button 
    onClick={handleClick}
    disabled={disabled}
    className="btn btn-info px-4 mr-3 mt-2 mt-sm-0"
  >
    {name}
  </button>
)

export default ToggleButton;
