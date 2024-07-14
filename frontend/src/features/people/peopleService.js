import axios from "axios";
import { normalize } from "normalizr";
import { people } from "../../schemas/schemas";

const API_URL = '/api/people/';

const fetchPeople = async ()=>{
    const response = await axios.get(API_URL);
    const normalizedData = normalize(response.data, [people]);
    return normalizedData;
}

const peopleService = { fetchPeople};

export default peopleService;