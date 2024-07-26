import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 0,
};

const orderStepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { nextStep, prevStep, setStep } = orderStepSlice.actions;

export default orderStepSlice.reducer;
