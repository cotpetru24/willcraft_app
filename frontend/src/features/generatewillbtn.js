// GenerateWillButton.js
import React from 'react';
import generateWillPdf from './pdfDoc';

const GenerateWillButton = () => {
  return (
    <button onClick={generateWillPdf}>Generate Will PDF</button>
  );
};

export default GenerateWillButton;