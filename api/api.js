import axios from 'axios';

// export const endpoint = "http://127.0.0.1:5000"
export const endpoint = "https://codeit.whereto.lol"

export const registerRequest = async (studentDetails) =>
    axios.post(`${endpoint}/register`, studentDetails)

export const voucherClaimRequest = async (details) =>
    axios.post(`${endpoint}/claim`, details)


export const getUpcomingCourses = async () =>
    axios.get(`${endpoint}/courses`)

export const getStudentFromEmail = async (email, tokenSource) =>
    axios.get(`${endpoint}/student?email=${email}`)

export const getDepositURL = async (reqBody) =>
    axios.post(`${endpoint}/deposit`, reqBody)

export const simulatePaymentNotification = async (reqBody) =>
    axios.post(`${endpoint}/payment_notification`, reqBody)

export const validateDeposit = async (email, deposit_code, tokenSource) =>
    axios.get(`${endpoint}/validate_deposit?email=${email}&deposit_code=${deposit_code}`, {
        cancelToken: tokenSource && tokenSource.token
    })

export const payRequest = async (reqBody) =>
    axios.post(`${endpoint}/pay`, reqBody)

export const getDiscountCode = (course_id, discountCode, tokenSource) =>
    axios.get(`${endpoint}/validate_discount?course_id=${course_id}&discount_code=${discountCode}`, {
        cancelToken: tokenSource && tokenSource.token
    })