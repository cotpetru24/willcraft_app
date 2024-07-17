import axios from "axios";
const API_URL = '/people/create';



const createPerson = async (personData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, personData, config);
    
    // if (response.data) {
    //     const people = JSON.parse(localStorage.getItem('people')) || [];
    //     people.push(response.data);
    //     localStorage.setItem('people', JSON.stringify(people));
    // }
    return response.data;
}


const getPerson = async () => {
    const response = await axios.get(API_URL);
    // const normalizedData = normalize(response.data, [person]);

    // return normalizedData;
    return response;
}

const peopleService = { getPerson, createPerson };

export default peopleService;
