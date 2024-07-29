import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatingOrderNavigation = ({onBack, onSaveAndContinue}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="creatingOrder-section-navigation-container">
      <button onClick={onBack}>Back</button>
      <button onClick={onSaveAndContinue}>Save and continue</button>
    </div>
  );
};

export default CreatingOrderNavigation;
