import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Register/DetailsInput.module.scss';
import RegisterInput from '../Reusables/RegisterInput/RegisterInput';
import { MenuItem, InputLabel, FormControl, styled } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { countries, schools, approvedCourses } from './nationalities';
import FormAutoComplete from '../../components/Form/FormAutoComplete';
import { isValid } from 'date-fns';

const CustomSelect = styled(Select)({
    '& .MuiSelect-select': {
        height: '20px !important'
    },
});

function DetailsInput({
    error,
    studentDetails,
    setStudentDetails,
    handleNextClicked,
    page
}) {

    const getSubsidy = () => {
        // iPrep
        let singaporeCitizen = studentDetails.nationality == "Singapore"
        let validSchool = studentDetails.school != "None"
            && studentDetails.school != "Others"
            && studentDetails.school != ""

        let validCourse = studentDetails.course != "Others" && studentDetails.course != ""

        console.log("Singapore Citizen: ", singaporeCitizen)
        console.log("Valid School: ", validSchool)
        console.log("Valid Course: ", validCourse)

        if (singaporeCitizen && validSchool && validCourse) {
            return {
                type: "IMDA iPrep",
                discount: 500.00
            }
        }
    }

    const getCountries = (countries) => {
        let countryLabels = []
        countries.map((country) => {
            countryLabels.push(country.label)
        })
        return countryLabels
    }

    const getApprovedCourses = () => {
        if (studentDetails.school && approvedCourses[studentDetails.school]) {
            let courses = [...approvedCourses[studentDetails.school]]
            return courses
        } else {
            return null
        }
    }

    let courses = [
        {
            name: "CodeIT Intro",
            cost: 500.0
        },
        {
            name: "CodeIT Essentials",
            cost: 500.0
        },
        {
            name: "CodeIT Advanced",
            cost: 500.0
        }
    ]

    let pathNames = ["intro", "essentials", "advanced"]

    const inputRefs = useRef({});

    const inputsInvalid = () => {
        return !studentDetails.selectedCourse || !studentDetails.school ||
            (studentDetails.school != "None" && studentDetails.school != "Others" && !studentDetails.course)
    }

    const displayEligibilityText = () => {
        if (!studentDetails.selectedCourse) {
            return (
                <div>
                    <p style={{ fontSize: '15px' }}>Please select a <b>preferred course </b>
                        to check your eligible subsidies!</p>
                </div>
            )
        } else if (!studentDetails.school) {
            return (
                <div>
                    <p style={{ fontSize: '15px' }}>Please select the school you are  <b>currently enrolled in</b></p>
                </div>
            )

        } else if (studentDetails.school != "None" && studentDetails.school != "Others" && !studentDetails.course) {
            return (
                <div>
                    <p style={{ fontSize: '15px' }}>Please select the course you are  <b>currently studying</b></p>
                </div>
            )
        }
    }

    if (page == 4) {
        return <></>
    }
    const router = useRouter();
    const endpoint = process.env.NODE_ENV == "dev" ? "http://localhost:3000" : "codeitacademy.com"


    return (
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <h1>Check Subsidy Eligibility!</h1>
                <p>Let us help you check whether you are eligible for subsidies to get the most out of our courses!</p>
            </div>

            <div className={styles.containerMiddle} >
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControl
                            variant="filled"
                            className={styles.selectInput}
                            style={{ marginBottom: '30px', width: '48%', }}
                            required
                            error={error.findIndex((elem) => elem.type === "selectedCourse") != -1}
                        >
                            <InputLabel
                                style={{
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    fontFamily: 'Poppins'
                                }}
                            >
                                Preferred Course
                            </InputLabel>

                            {/* Course Select */}
                            <CustomSelect
                                value={studentDetails.selectedCourse != null ? studentDetails.selectedCourse : ""}
                                onChange={(e) => {
                                    setStudentDetails({ ...studentDetails, selectedCourse: e.target.value })
                                }}
                                variant='filled'
                                label="Preferred Course"
                                defaultValue={0}
                                placeholder='Course'
                                renderValue={(val) => val == 0 ? "None" : courses[val - 1].name}


                            >
                                {/* <MenuItem value={0} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',

                                }}>
                                    <p style={{ fontSize: '15px' }}>None</p>
                                </MenuItem> */}
                                {courses.map((course, index) => {
                                    return (
                                        <MenuItem key={course} value={index + 1} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',

                                        }} >
                                            <p style={{ fontSize: '15px' }}>{course.name}</p>
                                            <button style={{
                                                cursor: 'pointer',
                                            }} target="_blank" onClick={() => {
                                                window.open(`/courses/${pathNames[index]}`, '_ blank')
                                            }}>
                                                <AiOutlineQuestionCircle style={{ fontSize: '20px' }} />
                                            </button>
                                        </MenuItem>
                                    )
                                })}
                            </CustomSelect>
                        </FormControl>

                        <div style={{ width: '48%' }}>
                            <FormAutoComplete
                                options={getCountries(countries)}
                                value={studentDetails.nationality}
                                handleChange={(newValue) => {
                                    setStudentDetails({ ...studentDetails, nationality: newValue })
                                }}
                                label="Nationality"
                            />
                        </div>
                    </div>

                    {/* School */}
                    <div style={{ display: 'flex' }}>
                        <div
                            style={{
                                marginBottom: '30px',
                                width: studentDetails.school == "Others" ? '48%' : '100%',
                            }}>
                            <FormAutoComplete
                                options={schools}
                                value={studentDetails.school}
                                handleChange={(newValue) => {
                                    setStudentDetails({ ...studentDetails, school: newValue })
                                }}
                                label="School"
                            />
                        </div>

                        {studentDetails.school == "Others" &&
                            <RegisterInput
                                label="Please Specify"
                                width="48%"
                                marginLeft='20px'
                                value={studentDetails.otherSchool}
                                setValue={(e) => {
                                    e.preventDefault()
                                    setStudentDetails({ ...studentDetails, otherSchool: e.target.value })
                                }}
                            />}
                    </div>

                    {/* Course of study */}
                    {
                        getApprovedCourses() ? (
                            <div style={{ display: 'flex' }}>
                                <div
                                    style={{
                                        marginBottom: '30px',
                                        width: studentDetails.course == "Others" ? '48%' : '100%',
                                    }}>
                                    <FormAutoComplete
                                        options={getApprovedCourses()}
                                        value={studentDetails.course}
                                        handleChange={(newValue) => {
                                            setStudentDetails({ ...studentDetails, course: newValue })
                                        }}
                                        label="Course of study"
                                        disabled={studentDetails.school == "None" || studentDetails.school == ""}
                                    />
                                </div>

                                {studentDetails.course == "Others" &&
                                    <RegisterInput
                                        label="Please Specify"
                                        width="48%"
                                        marginLeft='20px'
                                        value={studentDetails.otherCourse}
                                        setValue={(e) => {
                                            e.preventDefault()
                                            setStudentDetails({ ...studentDetails, otherCourse: e.target.value })
                                        }}

                                    />}
                            </div>

                        ) : (
                            <RegisterInput
                                // error={studentDetails.findIndex((elem) => elem.type === "course") != -1}
                                inputRefs={inputRefs}
                                index={1}
                                label="Course of Study"
                                width="100%"
                                value={studentDetails.otherCourse}
                                setValue={(e) => {
                                    setStudentDetails({ ...studentDetails, otherCourse: e.target.value })
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Tab') {
                                        handleNextClicked();
                                        e.preventDefault();
                                    }
                                }}
                            />
                        )


                    }


                    {/* Bottom text */}
                    <div style={{ padding: '0px 3px' }}>
                        {inputsInvalid() ?
                            (
                                displayEligibilityText()
                            ) : getSubsidy() ?
                                (
                                    < div className={styles.subsidyText}>
                                        <div>
                                            <span>Initial Price: </span>
                                            <p>{`${courses[studentDetails.selectedCourse - 1].cost} SGD`}</p>
                                        </div>
                                        <div>
                                            <span>Eligible Subsidy: </span>
                                            <p>{getSubsidy().type}</p>
                                        </div>
                                        <div>
                                            <span>Available Discount: </span>
                                            <p>{`-${getSubsidy().discount} SGD`}</p>
                                        </div>

                                        <div>
                                            <span>Cost after discount: </span>
                                            <p>{`${courses[studentDetails.selectedCourse - 1].cost - getSubsidy().discount} SGD`}</p>
                                        </div>
                                    </div>
                                )
                                : (
                                    <div><p style={{ fontSize: '15px' }}>You are not eligible for any subsidies. Sorry!</p></div>
                                )
                        }

                        <p className={styles.disclaimerText}>Disclaimer:&nbsp;&nbsp; blah blah blah</p>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default DetailsInput