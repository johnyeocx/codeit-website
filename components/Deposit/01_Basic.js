import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { getStudentFromEmail } from '../../api/api'
import styles from '../../styles/Deposit/Deposit.module.scss'
import styles2 from '../../styles/Register/DetailsInput.module.scss'
import { validateEmail } from '../constants'
import { useRouter } from 'next/router'

function Basic({
    upcomingCourses,
    setUpcomingCourses,
    page,
    setPage,
    depositDetails,
    setDepositDetails,
    emailFound,
    setEmailFound
}) {

    const [fadeOut, setFadeOut] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const getCourseString = (index) => {
        if (!upcomingCourses) return;

        const course = upcomingCourses[index]
        const dateString = format(new Date(course.start_date), 'dd LLL yyyy')

        return `${course.name}, ${dateString}, ${course.time}`
    }

    const handleNextClicked = async () => {
        setErrors({ "email": null })

        // 1. Check if email is invalid
        if (!validateEmail(depositDetails.email)) {
            setErrors({ "email": true })
            return;
        }

        // 2. Check if email exists
        setLoading(true)
        try {
            const res = await getStudentFromEmail(depositDetails.email)
            const student = res.data


            if (student != null) {
                setDepositDetails({
                    ...depositDetails,
                    first_name: student["first_name"],
                    last_name: student["last_name"],
                    email: student["email"],
                    birthDate: student["birth_date"],
                    mobileNumber: student["mobile_number"],
                })
                setEmailFound(true)
            } else {

                setEmailFound(false)
                setDepositDetails({
                    email: depositDetails.email,
                    selectedCourse: depositDetails.selectedCourse
                })
            }

        } catch (error) {
            console.log("Error validating email:", error)
            setLoading(false)
            return;
        }

        // 3. Go to next page
        setFadeOut(true)
        setTimeout(() => {
            setPage(page + 1)
            setFadeOut(false)
        }, 150)
        setLoading(false)
    }

    return (

        <div className={`${styles.middleContainer} ${fadeOut && styles.fadeOut}`} >

            <TextField

                error={errors.email != null}
                className={styles2.detailInput}
                label="Email"
                required={true}
                variant="filled"
                size='medium'
                value={depositDetails.email}
                onChange={(e) => setDepositDetails({ ...depositDetails, email: e.target.value })}

                style={{
                    width: "100%",
                }}

                inputProps={{
                    style: {
                        fontFamily: 'Work Sans',
                        fontWeight: '500',
                        fontSize: '15px',
                    }
                }}

                InputLabelProps={{
                    style: {
                        fontFamily: 'Poppins',
                        fontWeight: '500',
                        fontSize: '15px',
                    }
                }}
            />


            <FormControl
                variant="filled"
                className={styles2.selectInput}
                style={{ marginBottom: '30px', width: '100%' }}
                required
            >
                <InputLabel
                    style={{
                        fontSize: '15px',
                        fontWeight: '500',
                        fontFamily: 'Poppins'
                    }}
                >
                    Select Course
                </InputLabel>

                {/* Course Select */}
                <Select
                    onChange={(e) => {
                        console.log(e.target.value)
                        setDepositDetails({ ...depositDetails, selectedCourse: e.target.value })
                    }}
                    variant='filled'
                    label="Preferred Course"
                    defaultValue={0}
                    placeholder='Course'
                    renderValue={(val) => getCourseString(val)}
                >
                    {upcomingCourses && upcomingCourses.map((course, index) => {

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
            </FormControl>

            <Button
                variant="contained"
                style={{
                    backgroundColor: '#8F90F7',
                    width: 150,
                    height: 40,
                }}
                disableElevation
                onClick={() => handleNextClicked()}
            >
                {loading ? (
                    <CircularProgress style={{ padding: '10px', color: 'white' }} />
                ) : (
                    <p>Next</p>
                )}
            </Button>
        </div>
    )
}

export default Basic