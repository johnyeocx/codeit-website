import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Register/DetailsInput.module.scss';

import RegisterInput from '../Reusables/RegisterInput/RegisterInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';


function DetailsInput({
    error,
    selectedCourse,
    studentDetails,
    setStudentDetails,
    handleNextClicked,
    page
}) {

    let courses = ["CodeIT Introduction", "CodeIT Essentials", "CodeIT Advanced"]

    const inputRefs = useRef({});
    const [dob, setDOB] = useState(new Date());

    const handleDateChange = (newValue) => {
        setDOB(newValue);
    };
    if (page == 4) {
        return <></>
    }
    return (
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <h1>Fill in your details</h1>
                <p>Course: <span>{courses[selectedCourse]}</span></p>
            </div>

            <div className={styles.containerMiddle}>
                <div>
                    <RegisterInput
                        required={true}
                        error={error.findIndex((elem) => elem.type === "firstName") != -1}
                        index={1}
                        label="First Name"
                        width="100%"
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
                        label="Last Name" width="100%" inputRefs={inputRefs}
                        value={studentDetails.lastName}
                        setValue={(e) => {
                            setStudentDetails({ ...studentDetails, lastName: e.target.value })
                        }}
                    />
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
                            width="60%"
                            type="number"
                            value={studentDetails.mobile}
                            setValue={(e) => {
                                setStudentDetails({ ...studentDetails, mobile: e.target.value })
                            }}
                        />

                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}>
                            <MobileDatePicker

                                label="Date of Birth"
                                inputFormat="dd/MM/yyyy"
                                value={studentDetails.birthDate ? studentDetails.birthDate : new Date()}
                                onChange={(val) => {
                                    setStudentDetails({ ...studentDetails, birthDate: val })
                                }}
                                renderInput={(params) =>
                                    <TextField
                                        variant='filled'
                                        className={styles.detailInput}
                                        required
                                        size='medium'

                                        onKeyDown={(e) => {
                                            console.log(e.key)
                                            if (e.key === 'Tab') {
                                                handleNextClicked();
                                            }
                                            e.preventDefault();
                                        }}

                                        style={{
                                            marginLeft: '20px',
                                            width: '40%'
                                        }}

                                        inputProps={{
                                            style: {
                                                fontFamily: 'Work Sans',
                                                fontWeight: '500',
                                                fontSize: '17px',
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                fontFamily: 'Poppins',
                                                fontWeight: '500',
                                                fontSize: '17px',
                                            }
                                        }}

                                        {...params}
                                        error={error.findIndex((elem) => elem.type === "birthDate") != -1}
                                    />}
                            />

                        </LocalizationProvider>
                    </div>

                    <RegisterInput
                        // error={error.findIndex((elem) => elem.type === "email") != -1}
                        required={false}
                        index={6}
                        label="Discount Code" width="100%" inputRefs={inputRefs}
                        value={studentDetails.discountCode}
                        setValue={(e) => {
                            setStudentDetails({ ...studentDetails, discountCode: e.target.value })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

{/* <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            // value={value}
                            // onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        /> */}

export default DetailsInput