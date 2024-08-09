import axios from "axios";
const API_URL = '/api/people/';



export const createPerson = async (personData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, personData, config);
    return response.data;
}

export const updatePerson = async (personData, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+personData._id, personData, config)
    return response.data;
}




export const deletePerson = async (id, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(`beneficary to delete  id= ${id}`)

    const response = await axios.delete(API_URL+id, config)
    return response.data;
}

// export const getPerson = async () => {
//     const response = await axios.get(API_URL);
//     return response;
// }
const peopleService = { createPerson, updatePerson,deletePerson };

export default peopleService;
