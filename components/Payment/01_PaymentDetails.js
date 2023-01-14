import { FormControl, InputLabel, Select, MenuItem, styled, Button } from '@mui/material';
import { format } from 'date-fns';
import React, { useRef, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';
import styles from '../../styles/Payment/Payment.module.scss'
import DatePicker from './DatePicker';
import PaymentDetailsInput from './PaymentDetailsInput'
import axios from 'axios';
import { getDiscountCode, validateDeposit } from '../../api/api';

const CustomFormControl = styled(FormControl)({
    '& .MuiInputBase-root.Mui-disabled .MuiInputBase-input': {
        textFillColor: "#777"
    },
});

function PaymentDetails({
    emailLoading,
    setEmailLoading,

    depositLoading,
    setDepositLoading,

    paymentDetails,
    setPaymentDetails,

    depositInfo,
    setDepositInfo,

    discountInfo,
    setDiscountInfo,

    emailFound, 
    setEmailFound,

    depositFound,
    setDepositFound,

    fieldsLocked,
    setFieldsLocked,

    courses,
    page,
    setPage
}) {

    const [fadeOut, setFadeOut] = useState(false)
    const [discountLoading, setDiscountLoading] = useState(false)
    const [error, setError] = useState([]);
    // const [emailFound, setEmailFound] = useState(false);

    const tokRef = useRef(null)
    const onEmailChange = async (e) => {
        setPaymentDetails({ ...paymentDetails, email: e.target.value })
        setError([])
        let query = e.target.value
        console.log("query " + query)
        if (paymentDetails.deposit_code.length == 6 &&
            console.log(checkEmailAndDepositCode(query, paymentDetails.deposit_code))) {
            return
        }

        setEmailLoading(true)

        if (tokRef.current) {
            tokRef.current.cancel()
        }

        try {
            tokRef.current = axios.CancelToken.source();
            const res = await axios.get(`http://127.0.0.1:5000/student?email=${query}`, {
                cancelToken: tokRef.current.token
            })
            // console.log("res " + res.data)
            if (res.data) {
                setPaymentDetails({
                    ...paymentDetails,
                    email: query,
                    first_name: res.data["first_name"],
                    last_name: res.data["last_name"],
                    mobile_number: res.data["mobile_number"],
                    birth_date: res.data["birth_date"]
                })
                setEmailFound(true);
            } else {
                console.log("Email not found");
                setEmailFound(false);
            }
            setEmailLoading(false)
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request Cancelled")
            } else {
                console.log("Failed to query email:", error)
                setEmailLoading(false)
            }
        }
    }

    const onDepositCodeChange = async (e) => {
        const query = e.target.value
        setError([])
        setPaymentDetails({ ...paymentDetails, deposit_code: e.target.value })
        checkEmailAndDepositCode(paymentDetails.email, query)
    }

    const depositTokenRef = useRef(null)
    const checkEmailAndDepositCode = async (email, depositCode) => {
        setDepositLoading(true)
        setDepositFound(true)
        setDepositInfo(null)

        if (depositCode == undefined || depositCode.length != 6) {
            setDepositLoading(false)
            setDepositFound(false)
            setFieldsLocked({
                first_name: false,
                last_name: false,
                mobile_number: false,
                birth_date: false,
                selected_course: false
            })
            return;
        }

        console.log("Checking")

        if (depositTokenRef.current) {
            depositTokenRef.current.cancel()
        }

        try {
            depositTokenRef.current = axios.CancelToken.source()
            const res = await validateDeposit(email, depositCode, depositTokenRef.current)
            setDepositLoading(false)
            if (res.data) {
                console.log(res.data)
                const { student_info, deposit_info, course } = res.data
                let newPaymentDetails = {
                    ...paymentDetails,
                    deposit_code: depositCode,
                    email: email
                }
                let newFieldsLocked = { ...fieldsLocked }
                for (const field in student_info) {
                    if (fieldsLocked[field] !== undefined) {
                        newPaymentDetails[field] = student_info[field]
                        newFieldsLocked[field] = true
                    }
                }

                newFieldsLocked.selected_course = true

                for (let i = 0; i < courses.length; i++) {
                    if (courses[i].course_id == course["course_id"]) {
                        newPaymentDetails.selectedCourse = i
                    }
                }

                newPaymentDetails.discount_code = ""
                setDiscountInfo(null)

                setPaymentDetails(newPaymentDetails)
                setFieldsLocked(newFieldsLocked)
                setDepositFound(true)
                setDepositInfo(deposit_info)
                return true
            } else {
                setFieldsLocked({
                    first_name: false,
                    last_name: false,
                    mobile_number: false,
                    birth_date: false,
                    selected_course: false
                })
                setDepositFound(false)
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Cancelling deposit request")
            } else {
                console.log("Failed to validate deposit code:", error)
                setDepositLoading(false)
                setDepositFound(false)
            }
        }

        return false
    }

    const discountTokenRef = useRef(null)
    const onDiscountCodeChanged = async (e) => {
        const query = e.target.value

        setPaymentDetails({ ...paymentDetails, discount_code: query })

        if (query === "") {
            setDiscountInfo(null)
            return
        }
        if (paymentDetails.selectedCourse === "") return;

        setDiscountLoading(true)


        if (discountTokenRef.current) {
            discountTokenRef.current.cancel()
        }
        try {
            const course_id = courses[paymentDetails.selectedCourse].course_id
            discountTokenRef.current = axios.CancelToken.source()
            const res = await getDiscountCode(course_id, query, discountTokenRef.current)

            if (res.data) {
                setDiscountInfo(res.data)
            } else {
                setDiscountInfo(null)
            }
            setDiscountLoading(false)


        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Cancelling discount req")
            } else {
                console.log("Failed to get discount code", error)
                setDiscountLoading(false)
            }
        }
    }

    const getCourseString = (index) => {
        if (!courses) return;

        const course = courses[index]
        const dateString = format(new Date(course.start_date), 'dd LLL yyyy')

        return `${course.name}, ${dateString}, ${course.time}`
    }

    const handleNextClicked = () => {
        const err = checkDetailsInput();
        console.log(err);
        if (!completeInfo(err)) {
            return;
        }
        setFadeOut(true)
        setTimeout(() => {
            setPage(page + 1)
            setFadeOut(false)
        }, 150)
    }
    
    const checkDetailsInput = () => {
        let errors = [];
        // checkEmailAndDepositCode(paymentDetails.email, paymentDetails.depositCode);
        if (!emailFound) {
            errors.push(
                {
                    type: "email",
                    message: "not found"
                }
            )
        } else {
            if (paymentDetails.deposit_code != '' && !depositFound) {
                errors.push(
                    {
                        type: "paid_deposit",
                        message: "not found"
                    }
                )
            } 
    
            if (!validateEmail(paymentDetails.email)) {
                errors.push(
                    {
                        type: "email",
                        message: "invalid"
                    }
                )
            }
    
            if (paymentDetails.selectedCourse === "") {
                errors.push(
                    {
                        type: "selected_course",
                        message: "invalid"
                    }
                )
            }
        }
 
        setError(errors);
        return errors;
    }

    const completeInfo = (err) => {
        const field = ["email", "paid_deposit", "selected_course"];
        let complete = true;

        for (let key in err) {
            let val = Object.values(err[key]);
            if(field.includes(val[0])) {
                complete = false;
            }
        }
        return complete;
    }

    function validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        return false
    }

    return (
        <div className={`${styles.paymentDetailsContainer}  ${fadeOut && styles.fadeOut}`}>
            <div className={styles.header}>
                <h3>
                    Payment Details
                </h3>
                <p>
                    If you previously made a deposit, please enter the email used
                    for your deposit and the code that was sent to your email
                    upon the deposit confirmation.
                </p>
            </div>

            <div className={styles.inputsContainer}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>
                    <PaymentDetailsInput
                        label="Email"
                        width="48%"
                        error={error.findIndex((elem) => elem.type === "email") != -1}
                        errorText="Email invalid"
                        loading={emailLoading}
                        value={paymentDetails.email}
                        onChange={onEmailChange}
                        success={emailFound}
                        required
                    />

                    <PaymentDetailsInput
                        label="Deposit Code"
                        width="48%"
                        loading={depositLoading}
                        value={paymentDetails.deposit_code}
                        onChange={onDepositCodeChange}
                        error={error.findIndex((elem) => elem.type === "paid_deposit") != -1}
                        errorText="Deposit code invalid"
                        success={depositInfo !== null}
                    />
                </div>
                <div className={styles.separator} />

                <CustomFormControl
                    style={{
                        width: '100%',
                        marginBottom: '20px',

                    }}
                    error={error.findIndex((elem) => elem.type === "selected_course") != -1}
                    required
                    size='small'
                    disabled={fieldsLocked.selected_course}
                >
                    <InputLabel
                        style={{
                            fontSize: '13px',
                            fontWeight: '500',
                            fontFamily: 'Poppins',
                        }}
                    >
                        Select Course
                    </InputLabel>


                    <Select
                        label="Preferred Course"
                        placeholder='Course'

                        IconComponent={
                            fieldsLocked.selected_course
                                ? () =>
                                (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        transform: 'translateX(-14px)'
                                    }}>
                                        <TiTick style={{ fontSize: '20px', color: '#777' }} />
                                    </div>
                                )
                                : () => {
                                    return (<div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        transform: 'translateX(-14px)'
                                    }}>
                                        <BiChevronDown style={{ fontSize: '20px', color: '#777' }} />
                                    </div>)
                                }
                        }

                        value={paymentDetails.selectedCourse}
                        onChange={(e) => {
                            setPaymentDetails({
                                ...paymentDetails,
                                selectedCourse: e.target.value
                            })
                        }}
                        renderValue={(val) => {
                            return getCourseString(val)
                        }}

                        style={{
                            fontSize: '14px',
                            height: '50px',
                            marginTop: '-4px',
                        }}

                        className={styles.courseSelect}


                    >
                        {courses && courses.map((course, index) => {

                            const dateString = format(new Date(course.start_date), 'dd LLL yyyy')

                            return (
                                <MenuItem key={index} value={index} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }} >
                                    <div className={styles.courseSelectTile}>
                                        <h4>{`${index + 1}. ${course.name} `}</h4>
                                        <p><b>Start Date: </b>{`${dateString}, `}<b>Time: </b>{course.time}</p>
                                    </div>
                                </MenuItem>
                            )
                        })}
                    </Select>
                </CustomFormControl>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>
                    <PaymentDetailsInput
                        label="First Name"
                        width="48%"
                        value={paymentDetails.first_name}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, first_name: e.target.value })}
                        locked={fieldsLocked.first_name}
                        required
                    />
                    <PaymentDetailsInput
                        label="Last Name"
                        width="48%"
                        value={paymentDetails.last_name}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, last_name: e.target.value })}
                        locked={fieldsLocked.last_name}
                        required
                    />
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>
                    <PaymentDetailsInput
                        label="Mobile No."
                        width="48%"
                        value={paymentDetails.mobile_number}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, mobile_number: e.target.value })}
                        locked={fieldsLocked.mobile_number}
                        required
                    />
                    <DatePicker
                        date={paymentDetails.birth_date}
                        onChange={(val) => setPaymentDetails({ ...paymentDetails, birth_date: val })}
                        locked={fieldsLocked.birth_date}
                    />

                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>
                    <PaymentDetailsInput
                        label="Discount Code" width="100%"
                        value={paymentDetails.discount_code}
                        onChange={onDiscountCodeChanged}
                        loading={discountLoading}
                        success={discountInfo !== null}
                        locked={depositInfo !== null}
                        noTick={true}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#8F90F7',
                            width: 50,
                            height: 35,
                        }}
                        disableElevation
                        onClick={() => handleNextClicked()}
                    >
                        <p style={{ fontSize: '14px' }}>Next</p>
                    </Button>
                </div>
            </div>
        </div>


    )
}

export default PaymentDetails