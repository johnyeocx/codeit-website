import axios from 'axios';

// let endpoint = "http://127.0.0.1:5000"
export const endpoint = "https://codeit-website-backend.herokuapp.com"

export const registerRequest = async (studentDetails) =>
    axios.post(`${endpoint}/register`, studentDetails)
