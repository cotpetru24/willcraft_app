import axios from "axios";
import { normalize } from "normalizr";
import { assets } from "../../schemas/schemas";

const API_URL = '/api/assets'

const fetchOrderAssets = async () => {
    const response = await axios.get(API_URL);
    const normalizedData = normalize(response.data, [assets])
    return normalizedData;
} 

const orderAssetsService = {fetchOrderAssets};

export default orderAssetsService;