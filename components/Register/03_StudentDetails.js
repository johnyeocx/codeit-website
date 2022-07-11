import React, { useState } from 'react';
import styles from '../../styles/Register/StudentDetails.module.scss';
import rippleStyles from '../../styles/Components/RippleButton.module.scss';
import Checkbox from '@mui/material/Checkbox';
import RegisterInput from '../Reusables/RegisterInput/RegisterInput';
import RippleButton from '../Reusables/RippleButton/RippleButton';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import { registerRequest } from '../../api/api';
import { format } from 'date-fns';


function StudentDetails({
    schoolInfo,
    setSchoolInfo,
    studentDetails,
    selectedCourse,
    page,
    setSelectedPage,
}) {
    const [schoolInfoErr, setSchoolInfoErr] = useState([]);
    const [reqError, setReqError] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [tncConfirmed, setTncConfirmed] = useState(false);
    const [tncError, setTncError] = useState(false);

    const handleRegisterBtn = async () => {
        setSubmitting(true);

        if (schoolInfo.isStudent == 'Yes') {
            let errors = []
            for (let key in schoolInfo) {
                if (key === "isStudent") continue;
                if (!schoolInfo[key]) {
                    errors.push({
                        type: key,
                        message: `${key} field blank`
                    })
                }
            }
            setSchoolInfoErr(errors);
            if (errors.length !== 0) {
                setSubmitting(false);
                return;
            }
        }

        if (!tncConfirmed) {
            setTncError(true);
            setSubmitting(false);
            return;
        }

        let courseMap = ["Intro", "Essentials", "Advanced"]
        let reqBody = {
            ...studentDetails,
            birthDate: format(studentDetails.birthDate, "dd/MM/yyyy"),
            ...schoolInfo,
            selectedCourse: courseMap[selectedCourse]
        }

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
        return;
    }

    if (page == 4) {
        return <></>
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <h1>Student Information</h1>
            </div>

            <div className={styles.mainContainer}>

                <div className={styles.sectionOne}>
                    <h4>Are you a student?</h4>
                    <div className={styles.optionsContainer}>
                        <FormControl
                            variant="standard" sx={{ minWidth: 250 }}
                        >
                            <InputLabel>Student</InputLabel>
                            <Select
                                value={schoolInfo.isStudent}
                                // label="Age"
                                onChange={(e) => {
                                    setSchoolInfoErr([]);
                                    setSchoolInfo({ ...schoolInfo, isStudent: e.target.value })
                                    e.preventDefault();
                                }}
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                </div>
                <div className={styles.sectionTwo}>
                    <h4>School Information <span>(if you answered yes above)</span></h4>
                    <RegisterInput
                        error={schoolInfoErr.findIndex((elem) => elem.type === "school") != -1}

                        label="School"
                        width="100%"
                        value={schoolInfo.school}
                        setValue={(e) => {
                            setSchoolInfo({ ...schoolInfo, school: e.target.value })
                            e.preventDefault()
                        }}
                    />
                    <RegisterInput
                        error={schoolInfoErr.findIndex((elem) => elem.type === "course") != -1}
                        label="Course of Study"
                        width="100%"
                        value={schoolInfo.course}
                        setValue={(e) => {
                            setSchoolInfo({ ...schoolInfo, course: e.target.value })
                            e.preventDefault()
                        }}
                    />
                    <div className={styles.sectionThree}>
                        <Checkbox
                            checked={tncConfirmed}
                            onChange={() => setTncConfirmed((prev) => !prev)}
                            style={{ padding: 0, marginRight: 10 }}
                        />
                        <p style={
                            tncError ? {
                                color: 'red'
                            } : {}
                        }>
                            Please agree to our <a
                                // href={window.URL.createObjectURL(tncFile)}
                                target="_blank"
                                style={{ textDecoration: "underline" }}>
                                Terms & Conditions</a> before registering
                        </p>

                    </div>

                    <div className={styles.btnContainer}>
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
                                    <div className={styles.spinner}>Hello</div>

                                ) : (
                                    <>Register Now</>
                                )
                            }

                        </button>
                    </div>
                    {reqError && (
                        <div className={styles.errContainer}>Error: Please Try Again</div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default StudentDetails