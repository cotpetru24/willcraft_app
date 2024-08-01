import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../../common/styles';

const CreatingOrderNavigation = ({ onBack, onSaveAndContinue, buttonsDisabled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="creatingOrder-section-navigation-container">
      <button 
      onClick={onBack} 
      style={buttonsDisabled ?
        styles.disabledButton : {}}
      disabled={buttonsDisabled}
      >Back
      </button>
      <button 
      onClick={onSaveAndContinue} 
      style={buttonsDisabled ?
        styles.disabledButton : {}}
      disabled={buttonsDisabled}
      >Save and continue
      </button>
    </div>
  );
};

export default CreatingOrderNavigation;
