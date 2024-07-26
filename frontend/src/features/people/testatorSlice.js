import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateOrder, createOrder, createPerson, getPerson, updatePerson } from "../order/orderService";


const initialState = {
    _id:'',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel:'',
    maritalStatus:'',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createTestatorThunk = createAsyncThunk(
    'people/createTestator',
    async (testatorData, thunkAPI) => {
      const userId = thunkAPI.getState().auth.user._id; 
      const role = 'testator';
      const updatedTestatorData = { ...testatorData, userId, role };
  
      try {
        const token = thunkAPI.getState().auth.user.token; 
        return await createPerson(updatedTestatorData, token);
        
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  

  export const updateTestatorThunk = createAsyncThunk(
    'people/updateTestator',
    async ({ id, testatorData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await updatePerson(id, testatorData, token);

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const testatorSlice = createSlice({
    name: 'testator',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            //create Testator cases 
            .addCase(createTestatorThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTestatorThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel, maritalStatus } = action.payload;
                state._id = _id;
                state.title=title;
                state.fullLegalName=fullLegalName;
                state.fullAddress=fullAddress;
                state.dob=dob;
                state.email=email||'';
                state.tel=tel ||'';
                state.maritalStatus=maritalStatus ||'';
              })
            .addCase(createTestatorThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //Update testator cases
            .addCase(updateTestatorThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTestatorThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel, maritalStatus } = action.payload;
                state._id = _id;
                state.title=title;
                state.fullLegalName=fullLegalName;
                state.fullAddress=fullAddress;
                state.dob=dob;
                state.email=email||'';
                state.tel=tel ||'';
                state.maritalStatus=maritalStatus ||'';
            })
            .addCase(updateTestatorThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = testatorSlice.actions;

export default testatorSlice.reducer;






//-----------trigger create order when testator is added to the state-----------------



// TestatorComponent.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createOrderThunk } from '../features/order/orderSlice';

// const TestatorComponent = () => {
//   const dispatch = useDispatch();
//   const testator = useSelector((state) => state.testator.currentTestator); // Replace with your actual selector
//   const order = useSelector((state) => state.order.currentOrder);

//   useEffect(() => {
//     if (testator && testator._id && !order._id) {
//       // Only create an order if testator exists and there's no current order
//       dispatch(createOrderThunk({ testatorId: testator._id }));
//     }
//   }, [testator, order, dispatch]);

//   return (
//     <div>
//       {/* Your component code here */}
//     </div>
//   );
// };

// export default TestatorComponent;
