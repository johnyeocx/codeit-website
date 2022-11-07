import React, { useState } from 'react'
import styles from '../../styles/Deposit/Deposit.module.scss'
import { Button, CircularProgress } from '@mui/material';
import DetailsContainer from './DetailsContainer';
import { format } from 'date-fns';
import { getDepositURL, simulatePaymentNotification } from '../../api/api';

function Details({
    page,
    setPage,
    depositDetails,
    setDepositDetails,
    emailFound,
    upcomingCourses
}) {
    const [fadeOut, setFadeOut] = useState(false);
    const [loading, setLoading] = useState(false);

    const [fieldEditing, setFieldEditing] = useState({
        email: false,
        first_name: !depositDetails.first_name ? true : false,
        last_name: !depositDetails.last_name ? true : false,
        mobileNumber: !depositDetails.mobileNumber ? true : false,
        birthDate: !depositDetails.birthDate ? true : false,
    })

    const getCourseString = (index) => {
        if (!upcomingCourses) return;

        const course = upcomingCourses[index]
        const dateString = format(new Date(course.start_date), 'dd LLL yyyy')

        return `${course.name}, ${dateString}, ${course.time}`
    }

    const getDepositURLReq = async () => {

        const reqBody = {
            "first_name": depositDetails.first_name,
            "last_name": depositDetails.last_name,
            "email": depositDetails.email,
            "mobile_number": depositDetails.mobileNumber,
            "birth_date": depositDetails.birthDate,
            "course_id": upcomingCourses[depositDetails.selectedCourse].course_id
        }


        try {
            setLoading(true)
            const { data } = await getDepositURL(reqBody)
            setLoading(false)
            window.location.href = data.payment_url
        } catch (error) {
            setLoading(false)
            console.log("Failed to get deposit url:", error)
        }


        return;
    }

    return (
        <div className={`${styles.middleContainer} ${fadeOut && styles.fadeOut}`} >

            <div className={styles.container2}>
                <div className={styles.middleContainer}>
                    <>
                        <p className={styles.helperText}>The following details were found from your previous registration with us (based on email).
                            Please ensure that the everything is accurate and up to date before making a deposit.
                        </p>

                        <div><span>Email:</span>{`${depositDetails.email}`}</div>
                        <div style={{ marginTop: '15px' }}>
                            <span>Course:</span>{`${getCourseString(depositDetails.selectedCourse)}`}
                        </div>

                        <DetailsContainer
                            field="first_name"
                            label="First Name"
                            depositDetails={depositDetails}
                            setDepositDetails={setDepositDetails}
                            fieldEditing={fieldEditing}
                            setFieldEditing={setFieldEditing}
                        />
                        <DetailsContainer
                            field="last_name"
                            label="Last Name"
                            depositDetails={depositDetails}
                            setDepositDetails={setDepositDetails}
                            fieldEditing={fieldEditing}
                            setFieldEditing={setFieldEditing}
                        />
                        <DetailsContainer
                            field="mobileNumber"
                            label="Mobile"
                            depositDetails={depositDetails}
                            setDepositDetails={setDepositDetails}
                            fieldEditing={fieldEditing}
                            setFieldEditing={setFieldEditing}
                        />

                        <div style={{ marginTop: '15px' }}>
                            <span>Cost:</span><span>{`20 SGD`}</span>
                        </div>
                    </>
                </div>

                <div className={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#8F90F7',
                            width: 150,
                            height: 40
                        }}
                        disableElevation
                        onClick={() => {
                            setFadeOut(true)
                            setTimeout(() => {
                                setPage(page - 1)
                                setFadeOut(false)
                            }, 150)
                        }}

                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#8F90F7',
                            width: 150,
                            height: 40
                        }}
                        disableElevation
                        onClick={() => {
                            getDepositURLReq()
                        }}
                    >
                        {loading ? (
                            <CircularProgress style={{ padding: '10px', color: 'white' }} />
                        ) : (
                            <p> Pay By QR</p>
                        )}
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default Details