import axios from 'axios';
const API_URL = '/api/users/';
const API_URL_UPDATE_USER_DETAILS = '/api/users/updateUserDetails/';


const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

const logout = () => localStorage.removeItem('user')


const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


export const updateUserDetails = async (userData, token) => {
    console.log("Updating user details:", userData);  // Debugging: Log the user data being sent
    console.log("Token:", token);  // Debugging: Log the token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(API_URL_UPDATE_USER_DETAILS + userData.userId, userData, config);
        console.log("Response from updateUserDetails:", response.data);  // Debugging: Log the response data
        return response.data;
    } catch (error) {
        console.error("Error updating user details:", error.response ? error.response.data : error.message);  // Debugging: Log the error
        throw error;  // Re-throw the error so it can be handled by the calling code
    }
}



export const updateUserPassword = async (userData, token) => {
    console.log("Updating user password:", userData);  // Debugging: Log the user data being sent
    console.log("Token:", token);  // Debugging: Log the token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(API_URL + userData.userId, userData, config);
        console.log("Response from updateUserPassword:", response.data);  // Debugging: Log the response data
        return response.data;
    } catch (error) {
        console.error("Error updating user password:", error.response ? error.response.data : error.message);  // Debugging: Log the error
        throw error;  // Re-throw the error so it can be handled by the calling code
    }
}



const authService = { register, logout, login, updateUserPassword, updateUserDetails }

export default authService