import axios from "axios";
import { normalize } from "normalizr";
import { person } from "../../schemas/schemas";

const API_URL = '/api/people/';

const fetchPeople = async () => {
    const response = await axios.get(API_URL);
    const normalizedData = normalize(response.data, [person]);
    return normalizedData;
}

const storePerson = async (personData) => {
    const response = await axios.post(API_URL, personData);
    
    if (response.data) {
        const people = JSON.parse(localStorage.getItem('people')) || [];
        people.push(response.data);
        localStorage.setItem('people', JSON.stringify(people));
    }
    return response.data;
}

const peopleService = { fetchPeople, storePerson };

export default peopleService;
