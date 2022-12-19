import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../AppContext';
import DetailsInput from '../../components/Register/02_DetailsInput';
import StudentDetails from '../../components/Register/03_StudentDetails';
import SuccessPage from '../../components/Register/04_SuccessPage';
import styles from '../../styles/Register/Register.module.scss';
import moment from 'moment';
import bgImage from '../../assets/Register/BGImage.jpg';
import Image from 'next/image';
import Div100vh from 'react-div-100vh';

const breakpoints = {
    mobile: 481,
    tablet: 768,
    laptop: 950,
    desktop: 1025,
}
export const navigateSpeed = 0.4;

function Register() {

    const value = useContext(AppContext);
    let { dimensions } = value.state;
    let { setBgColor } = value;


    const [selectedCourse, setSelectedCourse] = useState(null);
    const [studentDetails, setStudentDetails] = useState({
        selectedCourse: null,
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        birthDate: null,
        nationality: "Singapore",
        discountCode: "",
        school: "",
        otherSchool: "",
        course: "",
        otherCourse: "",
    })

    const [schoolInfo, setSchoolInfo] = useState({
        isStudent: "Yes",
        school: "",
        course: "",
    })

    const [error, setError] = useState([]);
    const [courseSelectErr, setCourseSelectErr] = useState(false);
    const [page, setSelectedPage] = useState(1);
    const [transformSpeed, setTransformSpeed] = useState(0.2);

    const checkDetailsInput = () => {
        let errors = []
        for (let key in studentDetails) {
            if (key == "discountCode") {
                continue;
            }
            if (studentDetails[key] == null ||
                (key != "selectedCourse" && !studentDetails[key])) {
                let newError = {
                    type: key,
                    message: `${key} blank`

                }
                errors.push(newError)
                continue;
            }

            if (key === "email" && !validateEmail(studentDetails[key])) {
                errors.push({
                    type: "email",
                    message: "invalid email"
                })
            }

            if (key === "birthDate" && !validateDOB(studentDetails[key])) {
                errors.push({
                    type: "birthDate",
                    message: "invalid date of birth"
                })
            }
        }
        setError(errors)
        return errors.length === 0
    }

    function validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        return false
    }

    function validateDOB(date) {
        return moment(date).isBefore(moment(new Date()));
    }

    const handleNextClicked = () => {
        setTransformSpeed(navigateSpeed)
        setSelectedPage(page + 1)
    }

    useEffect(() => {
        setBgColor("#FFFDFD")

        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        let { course } = params
        let courseMap = {
            "intro": 0,
            "essentials": 1,
            "advanced": 2
        }

        if (course && courseMap[course] != undefined) {
            setSelectedCourse(courseMap[course])
            setSelectedPage(2)
        }

        const windowResize = () => {
            setTransformSpeed(0);
        }

        window.addEventListener('resize', windowResize)

        return () => {
            window.removeEventListener('resize', windowResize)
        }
    }, [])

    return (
        <Div100vh>
            <div className={styles.registerContainer}>
                {dimensions.width > breakpoints.tablet && (
                    <div className={styles.left}>
                        <div className={styles.overlay}>
                            <h1>Register Your Interest!</h1>
                        </div>
                        <div className={styles.imgContainer}>
                            <Image src={bgImage} layout="fill" objectFit="cover" />
                        </div>
                    </div>
                )}

                <div className={styles.right}>
                    {/* <h1>Register your interest!</h1> */}
                    <div
                        className={styles.contentContainer}
                        style={
                            page === 4 ?
                                {
                                    height: '100%',
                                }
                                : dimensions.width > breakpoints.tablet ? {
                                    transform: `translateX(-${(page - 1) * 50}vw)`,
                                    transition: `transform ${transformSpeed}s`
                                } : {
                                    transform: `translateX(-${(page - 1) * 100}vw)`,
                                    transition: `transform ${transformSpeed}s`
                                }
                        }
                    >
                        <DetailsInput
                            error={error}
                            setError={setError}
                            studentDetails={studentDetails}
                            setStudentDetails={setStudentDetails}
                            setSelectedCourse={setSelectedCourse}
                            selectedCourse={selectedCourse}
                            handleNextClicked={handleNextClicked}
                            page={page}
                        />
                        <StudentDetails
                            setTransformSpeed={setTransformSpeed}
                            setError={setError}
                            studentDetails={studentDetails}
                            setStudentDetails={setStudentDetails}
                            schoolInfo={schoolInfo}
                            setSchoolInfo={setSchoolInfo}
                            selectedCourse={selectedCourse}
                            setSelectedPage={setSelectedPage}
                            checkDetailsInput={checkDetailsInput}
                            page={page}
                            error={error}
                        />
                        <SuccessPage
                            selectedPage={page}
                            selectedCourse={selectedCourse}
                        />

                    </div>

                    <div className={styles.navigateContainer} style={
                        page === 3 ? { display: 'none' } : {}
                    }>

                        <button
                            style={page == 1 ? { opacity: 0.2 } : { opacity: 1 }}
                            onClick={() => {
                                if (page == 1) return;
                                setTransformSpeed(navigateSpeed)
                                setSelectedPage(page - 1)
                            }}>
                            Back
                        </button>

                        <div className={styles.progressContainer}>
                            <div className={`${page == 1 ? styles.circleOngoing :
                                page > 1 ? styles.circle : styles.circleIncomplete
                                } 
                                ${page == 1 && styles.active}`}
                            />
                            <div className={`${styles.line}  ${page > 1 && styles.complete}`} />
                            <div
                                className={`${page > 2 ? styles.circle : styles.circleIncomplete} 
                        ${page == 2 && styles.active}`}
                            />
                        </div>

                        <button
                            style={page == 2 ? { opacity: 0.2 } : { opacity: 1 }}
                            onClick={() => handleNextClicked()}
                            disabled={page === 2}
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>
        </Div100vh>

    )
}

export default Register