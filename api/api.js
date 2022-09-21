import axios from 'axios';

// export const endpoint = "http://127.0.0.1:5000"
export const endpoint = "https://codeit-website-backend.herokuapp.com"

export const registerRequest = async (studentDetails) =>
    axios.post(`${endpoint}/register`, studentDetails)

export const voucherClaimRequest = async (details) =>
    axios.post(`${endpoint}/claim`, details)
