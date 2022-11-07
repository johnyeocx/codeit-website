import React, { useState, useRef } from 'react';
import styles from '../../styles/Register/DetailsInput.module.scss';
import styles2 from '../../styles/Register/StudentDetails.module.scss';
import rippleStyles from '../../styles/Components/RippleButton.module.scss';
import Checkbox from '@mui/material/Checkbox';
import RegisterInput from '../Reusables/RegisterInput/RegisterInput';

import { registerRequest } from '../../api/api';
import TnCFile from '../../public/assets/TnC.pdf'
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useRouter } from 'next/router'
import moment from 'moment';
import { format } from 'date-fns';


function StudentDetails({
    schoolInfo,
    setSchoolInfo,
    studentDetails,
    setStudentDetails,
    selectedCourse,
    page,
    setSelectedPage,
    error,
}) {
    const [schoolInfoErr, setSchoolInfoErr] = useState([]);
    const [reqError, setReqError] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [tncConfirmed, setTncConfirmed] = useState(false);
    const [tncError, setTncError] = useState(false);
    const inputRefs = useRef({});
    const router = useRouter()

    const handleRegisterBtn = async () => {
        setSubmitting(true);

        if (!tncConfirmed) {
            setTncError(true);
            setSubmitting(false);
            return;
        }

        let reqBody = studentDetails
        reqBody["birthDate"] = moment(reqBody["birthDate"]).format("YYYY-MM-DD")

        try {
            let res = await registerRequest(reqBody)

            if (res.status != 200) {
                console.log(res.message);
                setSubmitting(false);
                return;
            }
        } catch (error) {
            console.log(error);
            setReqError(true);
            setSubmitting(false);
            return;
        }

        setSelectedPage((prev) => prev + 1);
        setReqError(false);
        setSubmitting(false);
        return;
    }

    if (page == 4) {
        return <></>
    }

    const redirectToPaymentPage = async () => {
        console.log(studentDetails);
        router.push({
            pathname: "/pay",
            query: {
                first_name: studentDetails.firstName,
                last_name: studentDetails.lastName,
                email: studentDetails.email,
                mobile_number: studentDetails.mobile,
                birth_date: format(studentDetails.birthDate, "dd-MM-yy"),
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <h1>Student Information</h1>
            </div>

            <div className={styles.mainContainer}>
                <div style={{ display: 'flex' }}>
                    <RegisterInput
                        required={true}
                        error={error.findIndex((elem) => elem.type === "firstName") != -1}
                        index={1}
                        label="First Name"
                        width="50%"
                        inputRefs={inputRefs}
                        value={studentDetails.firstName}
                        setValue={(e) => {
                            setStudentDetails({ ...studentDetails, firstName: e.target.value })
                        }}
                    />
                    <RegisterInput
                        required={true}
                        error={error.findIndex((elem) => elem.type === "lastName") != -1}
                        index={2}
                        label="Last Name" width="50%" inputRefs={inputRefs}
                        value={studentDetails.lastName}
                        setValue={(e) => {
                            setStudentDetails({ ...studentDetails, lastName: e.target.value })
                        }}
                        marginLeft="20px"
                    />
                </div>

                <RegisterInput
                    required={true}
                    error={error.findIndex((elem) => elem.type === "email") != -1}
                    index={3}
                    type="email"
                    label="Email" width="100%" inputRefs={inputRefs}
                    value={studentDetails.email}
                    setValue={(e) => {
                        setStudentDetails({ ...studentDetails, email: e.target.value })
                    }}
                />

                <div style={{ display: 'flex' }}>
                    <RegisterInput
                        required={true}
                        error={error.findIndex((elem) => elem.type === "mobile") != -1}
                        index={4}
                        inputRefs={inputRefs}
                        label="Mobile No."
                        width="50%"
                        type="number"
                        value={studentDetails.mobile}
                        setValue={(e) => {
                            setStudentDetails({ ...studentDetails, mobile: e.target.value })
                        }}
                    />

                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            error={error.findIndex((elem) => elem.type === "birthDate") != -1}
                            inputRef={(ref) => {
                                if (inputRefs) inputRefs.current[5] = ref
                            }}
                            label="Date of Birth"
                            inputFormat="dd/MM/yyyy"
                            value={studentDetails.birthDate ? studentDetails.birthDate : null}
                            onChange={(val) => {
                                setStudentDetails({ ...studentDetails, birthDate: val })
                            }}
                            renderInput={(params) =>
                                <TextField
                                    variant='filled'
                                    required
                                    size='small'

                                    style={{
                                        marginLeft: '20px',
                                        width: '50%',
                                    }}
                                    className={styles.detailInput}

                                    {...params}
                                    error={error.findIndex((elem) => elem.type === "birthDate") != -1}

                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Poppins',
                                            fontWeight: '500',
                                            fontSize: '15px',
                                            top: '2px'
                                        }
                                    }}
                                />
                            }
                        />

                    </LocalizationProvider>
                </div>

                <div className={styles2.sectionTwo}>
                    <div className={styles2.sectionThree}>
                        <Checkbox
                            checked={tncConfirmed}
                            onChange={() => setTncConfirmed((prev) => !prev)}
                            style={{ padding: 0, marginRight: 10, transform: 'scale(0.8)' }}
                        />
                        <p style={
                            tncError ? {
                                color: 'red'
                            } : {}
                        }>
                            Please agree to our <a
                                href={TnCFile}
                                target="_blank"
                                rel="noreferrer"
                                style={{ textDecoration: "underline" }}>
                                Terms & Conditions</a> before registering
                        </p>

                    </div>

                    {reqError && (
                        <div className={styles2.errContainer}>Error: Please Try Again</div>
                    )}

                    <div className={styles2.btnContainer}>
                        <button
                            className={
                                submitting ?
                                    `${rippleStyles.rippleButtonSubmitting} ${rippleStyles.rpPrimary}` :
                                    `${rippleStyles.rippleButton} ${rippleStyles.rpPrimary}`
                            }
                            onClick={() => handleRegisterBtn()}
                        >
                            {
                                submitting ? (
                                    <div className={styles2.spinner}></div>

                                ) : (
                                    <>Register Now</>
                                )
                            }

                        </button>
                    </div>

                    <div style={{
                        display: 'flex',
                        marginTop: '20px',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{ height: 2, backgroundColor: '#aaa', width: '45%' }} />
                        <p style={{
                            padding: 0, margin: '0px 10px', color: '#aaa', fontSize: '16px'
                        }}>or</p>
                        < div style={{ height: 2, backgroundColor: '#aaa', width: '45%' }} />

                    </div>
                    <div className={styles2.btnContainer}>
                        <button
                            className={
                                submitting ?
                                    `${rippleStyles.rippleButtonSubmitting} ${rippleStyles.rpSecondary}` :
                                    `${rippleStyles.rippleButton} ${rippleStyles.rpSecondary}`
                            }
                            onClick={() => redirectToPaymentPage()}
                        >
                            {
                                submitting ? (
                                    <div className={styles2.spinner}></div>

                                ) : (
                                    <>Pay & Enrol Now</>
                                )
                            }

                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StudentDetails