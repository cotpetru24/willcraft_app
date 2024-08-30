// import React, { useState, useEffect } from 'react';

// const DateInput = ({ value, onChange }) => {
//   const [day, setDay] = useState('');
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (value) {
//       const date = new Date(value);
//       setDay(date.getDate());
//       setMonth(date.getMonth() + 1); // Months are 0-based in JS
//       setYear(date.getFullYear());
//     }
//   }, [value]);

//   const handleDayChange = (e) => {
//     const newDay = e.target.value;
//     setDay(newDay);
//     validateAndHandleChange(newDay, month, year);
//   };

//   const handleMonthChange = (e) => {
//     const newMonth = e.target.value;
//     setMonth(newMonth);
//     validateAndHandleChange(day, newMonth, year);
//   };

//   const handleYearChange = (e) => {
//     const newYear = e.target.value;
//     setYear(newYear);
//     validateAndHandleChange(day, month, newYear);
//   };

//   const validateAndHandleChange = (day, month, year) => {
//     if (day && month && year && isValidDate(day, month, year)) {
//       const date = new Date(`${year}-${month}-${day}`);
//       if (onChange) {
//         onChange({
//           target: {
//             name: 'dob',
//             value: date.toISOString().split('T')[0]
//           }
//         });
//       }
//       setError('');
//     } else {
//       setError('Invalid date');
//     }
//   };

//   const isValidDate = (day, month, year) => {
//     const date = new Date(`${year}-${month}-${day}`);
//     return (
//       date.getFullYear() === parseInt(year) &&
//       date.getMonth() + 1 === parseInt(month) &&
//       date.getDate() === parseInt(day)
//     );
//   };

//   return (
//     <div className="date-input">
//       <input
//         type="number"
//         placeholder="DD"
//         value={day}
//         onChange={handleDayChange}
//         min="1"
//         max="31"
//         className="date-input-field"
//         required
//       />
//       <input
//         type="number"
//         placeholder="MM"
//         value={month}
//         onChange={handleMonthChange}
//         min="1"
//         max="12"
//         className="date-input-field"
//         required
//       />
//       <input
//         type="number"
//         placeholder="YYYY"
//         value={year}
//         onChange={handleYearChange}
//         min="1900"
//         max={new Date().getFullYear()}
//         className="date-input-field"
//         required
//       />
//       {error && <div className="error-message">{error}</div>}
//     </div>
//   );
// };

// export default DateInput;
