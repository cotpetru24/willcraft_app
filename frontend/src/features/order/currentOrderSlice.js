import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateOrder, createOrder, getOrder } from "./currentOrderService"; // Import named exports
import { updateTestatorSlice } from "../people/testator/testatorSlice";
import { updateSpouseOrPartnerSlice } from "../people/spouseOrPartner/spouseOrPartnerSlice";
import constants from "../../common/constants";
import { updateKidsSlice } from "../people/kids/kidsSlice";
import { updateAssetsSlice } from "../orderAssets/orderAssetsSlice";


const initialState = {
    orderId: '',
    userId: '',
    status: '',
    peopleAndRoles: [],
    assetsAndDistribution: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};



// Thunk for creating an order
export const createOrderThunk = createAsyncThunk(
    'currentOrder/createOrderThunk',
    async (orderData, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user._id;
        const updatedOrderData = { ...orderData, userId };
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await createOrder(updatedOrderData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getOrderThunk = createAsyncThunk(
    'currentOrder/getOrderThunk',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const response = await getOrder(id, token);
            const testator = response.peopleAndRoles.find(p => p.role.includes(constants.role.TESTATOR));
            // const spouseOrPartner = response.peopleAndRoles.find(p => p.role.includes(constants.role.SPOUSE || constants.role.PARTNER));
            const spouseOrPartner = response.peopleAndRoles.find(p => p.role.includes(constants.role.SPOUSE) || p.role.includes(constants.role.PARTNER));
            // const kids = response.peopleAndRoles.find(p=>p.role.includes(constants.role.KID))
            // const kids = response.peopleAndRoles.filter(p => p.role.includes(constants.role.KID));

            // Filter all entries with the role 'KID'
            const kids = response.peopleAndRoles.filter(p => p.role.includes(constants.role.KID)).map(p => ({
                ...p.personId,
                role: p.role,
                // _id: p._id
                _id: p.personId._id
            }));

            // const assets = response.assetsAndDistribution

            const assets = response.assetsAndDistribution.map(a=>({
                ...a.assetId,
                distribution:a.distribution
            }))

            // const spouseOrPartner = response.peopleAndRoles.find(p => p.role.includes("spouse" || "partner"));
            console.log(`spouseorpartner payload = ${JSON.stringify(spouseOrPartner)}`)


            // Ensure response contains the testator data
            if (!testator) {
                throw new Error('Testator data is missing in the response');
            }
            thunkAPI.dispatch(updateTestatorSlice(testator.personId));
            if (spouseOrPartner) {
                thunkAPI.dispatch(updateSpouseOrPartnerSlice(spouseOrPartner.personId))
            }
            // if (kids) {
            //     thunkAPI.dispatch(updateKidsSlice(kids))
            // }
            // thunkAPI.dispatch(updateSpouseOrPartnerSlice(spouseOrPartner.personId))
            console.log(`kids length = ${kids.length}`)
            // if (kids) {
            //     thunkAPI.dispatch(updateKidsSlice(kids.map(kid => kid.personId)));
            // }
            // if (Array.isArray(kids) && kids.length > 0) {
            //     console.log(`kids length = ${kids.length}`)
            //     thunkAPI.dispatch(updateKidsSlice(kids.map(kid => kid.personId)));
            // }
            if (Array.isArray(kids) && kids.length > 0) {
                console.log(`kids length = ${kids.length}`)

                thunkAPI.dispatch(updateKidsSlice(kids));
            }

            if (assets) {
                thunkAPI.dispatch(updateAssetsSlice(assets))

            }

            return response;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.error('Error in getOrderThunk:', message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//need to test this function--------------------------
// export const updateOrderThunk = createAsyncThunk(
//     'orders/updateOrder',
//     async ({ id, orderData }, thunkAPI) => {
//         try {
//             const token = thunkAPI.getState().auth.user.token;
//             return await updateOrder(id, orderData, token);
//         } catch (error) {
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

export const updateOrderThunk = createAsyncThunk(
    'currentOrder/updateOrderThunk',
    async (orderData, thunkAPI) => {

        console.log(`update order called in order slice`)
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await updateOrder(orderData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);



const currentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState,
    reducers: {
        updateCurrentOrderSlice: (state, action) => {
            const { orderId, userId, status, peopleAndRoles, assetsAndDistribution, } = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.orderId = action.payload.orderId;
            state.userId = action.payload.userId;
            state.status = action.payload.status;
            state.peopleAndRoles = action.payload.peopleAndRoles.map(pr => ({
                personId: pr.personId._id || pr.personId, // In case personId is populated, take only the _id
                role: pr.role
            }));
            state.assetsAndDistribution = assetsAndDistribution.map(ad => ({
                assetId: ad.assetId._id || ad.assetId, // In case assetId is populated, take only the _id
                distribution: (ad.distribution || []).map(dist => ({
                    personId: dist.personId._id || dist.personId, // In case personId is populated, take only the _id
                    receivingAmount: dist.receivingAmount
                }))
            }));
        },
        resetCurrentOrderSlice: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder


            .addCase(createOrderThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrderThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderId = action.payload._id;
                state.userId = action.payload.userId;
                state.status = action.payload.status;
                state.peopleAndRoles = action.payload.peopleAndRoles;
                state.assetsAndDistribution = action.payload.assetsAndDistribution;
            })
            .addCase(createOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


            .addCase(updateOrderThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderId = action.payload._id;
                state.userId = action.payload.userId;
                state.status = action.payload.status;
                state.peopleAndRoles = action.payload.peopleAndRoles.map(pr => ({
                    personId: pr.personId._id || pr.personId, // In case personId is populated, take only the _id
                    role: pr.role
                }));
                state.assetsAndDistribution = action.payload.assetsAndDistribution.map(ad => ({
                    assetId: ad.assetId._id || ad.assetId, // In case assetId is populated, take only the _id
                    distribution: ad.distribution.map(dist => ({
                        personId: dist.personId._id || dist.personId, // In case personId is populated, take only the _id
                        receivingAmount: dist.receivingAmount
                    }))
                }));
            })

            .addCase(updateOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


            .addCase(getOrderThunk.pending, (state) => {
                state.isLoading = true;
            })
            // .addCase(getOrderThunk.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.orderId = action.payload._id;
            //     state.userId = action.payload.userId;
            //     state.status = action.payload.status;

            // })
            .addCase(getOrderThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderId = action.payload._id;
                state.userId = action.payload.userId;
                state.status = action.payload.status;
                state.peopleAndRoles = action.payload.peopleAndRoles.map(pr => ({
                    personId: pr.personId._id || pr.personId, // In case personId is populated, take only the _id
                    role: pr.role
                }));
                state.assetsAndDistribution = action.payload.assetsAndDistribution.map(ad => ({
                    assetId: ad.assetId._id || ad.assetId, // In case assetId is populated, take only the _id
                    distribution: ad.distribution.map(dist => ({
                        personId: dist.personId._id || dist.personId, // In case personId is populated, take only the _id
                        receivingAmount: dist.receivingAmount
                    }))
                }));
            })

            .addCase(getOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { resetCurrentOrderSlice, updateCurrentOrderSlice } = currentOrderSlice.actions;





export default currentOrderSlice.reducer;
