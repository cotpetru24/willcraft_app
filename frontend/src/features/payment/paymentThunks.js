import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../common/constants";
import { createPaymentIntent, createPayment } from "./paymentService";


export const createPaymentIntentThunk = createAsyncThunk(
    'payments/createPaymentIntentThunk',
    async (products, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await createPaymentIntent(products, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createPaymentThunk = createAsyncThunk(
    'payments/createPayment',
    async (paymentData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await createPayment(paymentData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);







// export const getOrderThunk = createAsyncThunk(
//     'currentOrder/getOrderThunk',
//     async (id, thunkAPI) => {
//         try {
//             const token = thunkAPI.getState().auth.user.token;
//             const response = await getOrder(id, token);

//             const testator = response.peopleAndRoles.find(p => p.role.includes(constants.role.TESTATOR));
//             const spouseOrPartner = response.peopleAndRoles.find(p => p.role.includes(constants.role.SPOUSE) || p.role.includes(constants.role.PARTNER));

//             const kids = response.peopleAndRoles.filter(p => p.role.includes(constants.role.KID)).map(p => ({
//                 ...p.personId,
//                 role: p.role,
//                 // _id: p._id
//                 _id: p.personId._id
//             }));
//             const additionalExecutors = response.peopleAndRoles.filter(
//                 p => p.role.includes(constants.role.ADDITIONAL_EXECUTOR)).map(p => ({
//                 ...p.personId,
//                 role: p.role,
//                 // _id: p._id
//                 _id: p.personId._id
//             }));

//             const additionalBeneficiaries = response.peopleAndRoles.filter(
//                 p => p.role.includes('additional beneficiary')).map(p => ({
//                 ...p,
//                 role: p.role,
//                 _id: p.personId._id || p._id,
//                 // personId:p.personId //this was added ++++++++++++++++++++++
//             }))

//             // const executors = response.peopleAndRoles
//             //     .filter(p => !p.role.includes(constants.role.TESTATOR))
//             //     .map(p => ({
//             //         ...p.personId,
//             //         role: p.role, // Fix the typo from role to roles
//             //         _id: p.personId._id
//             //     }));


//             // const executors = response.peopleAndRoles
//             // .filter(p => Array.isArray(p.roles) && !p.roles.includes("testator"))
//             // .map(p => ({
//             //     ...p.personId,
//             //     role: p.role,
//             //     _id: p.personId._id
//             // }));





//             const assets = response.assetsAndDistribution.map(a => ({
//                 ...a.assetId,
//                 distribution: a.distribution
//             }))

//             if (!testator) {
//                 throw new Error('Testator data is missing in the response');
//             }
//             thunkAPI.dispatch(updateTestatorSlice(testator.personId));
//             if (spouseOrPartner) {
//                 thunkAPI.dispatch(updateSpouseOrPartnerSlice(spouseOrPartner.personId))
//             }

//             if (Array.isArray(kids) && kids.length > 0) {

//                 thunkAPI.dispatch(updateKidsSlice(kids));
//             }

//             if (assets) {
//                 thunkAPI.dispatch(updateAssetsSlice(assets))

//             }
//             if (additionalExecutors) thunkAPI.dispatch(updateAdditionalExecutorsSlice(additionalExecutors))



//             if (additionalBeneficiaries) thunkAPI.dispatch(updateAdditionalBeneficiariesSlice(additionalBeneficiaries))


//             return response;
//         } catch (error) {
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//             console.error('Error in getOrderThunk:', message);
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );