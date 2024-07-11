import React, { useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import '../index.css'; // Import the custom CSS file

const CountrySelect = () => {
  const [value, setValue] = useState(null);
  const options = countryList().getData();

  const formatOptionLabel = ({ label, value, ...rest }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
        alt={label}
        style={{ marginRight: 10, width: 20, height: 15 }}
      />
      {label}
    </div>
  );

  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      classNamePrefix="country-select"
      formatOptionLabel={formatOptionLabel}
    />
  );
};

export default CountrySelect;
