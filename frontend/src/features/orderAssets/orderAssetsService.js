import axios from "axios";
import { normalize } from "normalizr";
import { assets } from "../../schemas/schemas";

const API_URL = '/api/assets'

const fetchOrderAssets = async () => {
    const response = await axios.get(API_URL);
    const normalizedData = normalize(response.data, [assets])
    return normalizedData;
} 


export const createAsset = async (assetData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, assetData, config);
    return response.data;
}




const orderAssetsService = {fetchOrderAssets, createAsset};

export default orderAssetsService;