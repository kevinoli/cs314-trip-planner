import React from "react";
import Select from "react-select";

export function MultiSelect(props) {
    const {selectedValues, setSelectedValues, options, placeholder, isMulti,} = props;
    
    const handleChange = (selectedOptions) => {
    setSelectedValues(selectedOptions || []);
    };

    return (
        <Select
            value={selectedValues}
            options={options}
            isMulti={isMulti}
            onChange={handleChange}
            placeholder={`Select ${placeholder}...`}
        />
    );
} 
