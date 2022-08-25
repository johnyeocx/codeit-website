import React, { useContext, useEffect, useRef } from 'react';
import AppContext from '../../AppContext';
import CourseLanding from '../../components/Courses/01_CourseLanding';
import CourseIntro from '../../components/Courses/02_CourseIntro';
import styles from '../../styles/Courses/Course.module.scss';
import Div100vh from 'react-div-100vh';
import CourseUSP from '../../components/Courses/03_CourseUSP';
import Curriculum from '../../components/Courses/04_Curriculum';
import CourseRegister from '../../components/Courses/05_CourseRegister';
import CourseTeachers from '../../components/Courses/06_CourseTeachers';
import { ciAdvanced } from '../../components/Courses/courseData';
import NavButton from '../../components/Layout/NavButton/NavButton';

function Advanced() {
    const value = useContext(AppContext);
    let { bgColor } = value.state;
    let { setBgColor } = value;
    const teachersRef = useRef(null);
    const bgPrimary = "#F9F8FF"
    const bgSecondary = "#EEEAFF"

    const scrollToElement = (id) => {
        let nextSection = document.querySelector(id);
        let y = nextSection.getBoundingClientRect().top - 80;
        document.getElementById("course-details").scrollBy({
            top: y,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        setBgColor("#FCFDFF")
    }, [])

    const buttons = [
        { title: "Why Advanced?", element: "#course-usp" },
        { title: "Curriculum", element: "#course-curriculum" },
        { title: "Schedule", element: "#course-signup" },
        { title: "Pricing", element: "#course-pricing" },
        { title: "Teachers", element: "#course-teachers" }
    ]

    return (
        <Div100vh
            className={styles.container}
            style={{
                backgroundColor: bgColor
            }}
            id="course-details"
        >

            <CourseLanding coursePath={ciAdvanced.coursePath} landingData={ciAdvanced.landing} />
            <CourseIntro bgSecondary={bgSecondary} overview={ciAdvanced.overview} title={ciAdvanced.title} />

            <div className={styles.contentContainer}>
                <div className={styles.sidebar}>
                    <div className={styles.title}>
                        <h2>Navigate</h2>
                    </div>
                    <div className={styles.buttonsContainer}>
                        {
                            buttons.map((section, index) => (
                                <NavButton
                                    key={index}
                                    text={section.title}
                                    style={{ margin: '5px 0px' }}
                                    onClick={() => scrollToElement(section.element)}
                                />
                            )
                            )
                        }
                    </div>
                </div>
                <div className={styles.mainContent}>
                    <CourseUSP title={ciAdvanced.title} benefits={ciAdvanced.benefits} />
                    <Curriculum
                        prerequisites={ciAdvanced.prerequisites}
                        curriculum={ciAdvanced.curriculum}
                        brochure={ciAdvanced.brochure}
                    />
                    <CourseRegister signup={ciAdvanced.signup} coursePath={ciAdvanced.coursePath} />
                    <CourseTeachers bgSecondary={bgSecondary} teachers={ciAdvanced.teachers} />
                </div>
            </div>


        </Div100vh>

    )
}

export default Advanced