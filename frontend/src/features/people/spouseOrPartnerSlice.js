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
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createSpouseOrPartnerThunk = createAsyncThunk(
    'people/createSpouseOrPartner',
    async (spouseOrPartnerData, thunkAPI) => {
      const userId = thunkAPI.getState().auth.user._id;
      const role = 'spouseOrPartner';
      const updatedSpouseOrPartnerData = { ...spouseOrPartnerData, userId, role };
  
      try {
        const token = thunkAPI.getState().auth.user.token; 
        return await createPerson(updatedSpouseOrPartnerData, token);
        
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  

  export const updateSpouseOrPartnerThunk = createAsyncThunk(
    'people/updateSpouseOrPartner',
    async ({ id, spouseOrPartnerData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await updatePerson(id, spouseOrPartnerData, token);

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const spouseOrPartnerSlice = createSlice({
    name: 'spouseOrPartner',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            //create SpouseOrPartner cases 
            .addCase(createSpouseOrPartnerThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSpouseOrPartnerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel } = action.payload;
                state._id = _id;
                state.title=title;
                state.fullLegalName=fullLegalName;
                state.fullAddress=fullAddress;
                state.dob=dob;
                state.email=email||'';
                state.tel=tel ||'';
              })
            .addCase(createSpouseOrPartnerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //Update SpouseOrPartner cases
            .addCase(updateSpouseOrPartnerThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSpouseOrPartnerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel } = action.payload;
                state._id = _id;
                state.title=title;
                state.fullLegalName=fullLegalName;
                state.fullAddress=fullAddress;
                state.dob=dob;
                state.email=email||'';
                state.tel=tel ||'';
            })
            .addCase(updateSpouseOrPartnerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = spouseOrPartnerSlice.actions;

export default spouseOrPartnerSlice.reducer;

