import React from 'react'
import styles from '../../styles/Register/CourseSelection.module.scss';

import IntroBG from '../../assets/Register/IntroBG.svg';
import SelectedBG from '../../assets/Register/SelectedBG.svg';
import EssentialsBG from '../../assets/Register/EssentialsBG.svg';
import AdvancedBG from '../../assets/Register/AdvancedBG.svg';
import BackgroundDesign from '../../assets/Register/BackgroundDesign.svg';
import { navigateSpeed } from '../../pages/register';

function CourseSelection({
    error,
    setError,
    selectedCourse,
    setSelectedCourse,
    setSelectedPage,
    page,
    setTransformSpeed
}) {
    const handleCourseClicked = (e, index) => {
        setTransformSpeed(navigateSpeed);
        setSelectedPage(2);
        setSelectedCourse(index)
        setError("")
        e.preventDefault();
    }

    if (page == 4) {
        return <></>
    }
    return (
        <div className={styles.container}>

            <div className={styles.containerTop}>
                <h1>Select a course</h1>
            </div>
            <div className={styles.containerMiddle}>

                <button onClick={(e) => handleCourseClicked(e, 0)}>
                    {
                        selectedCourse === 0 ?
                            <SelectedBG className={styles.courseBg} style={{
                                borderColor: '#68B2FF'
                            }} />
                            : <IntroBG className={styles.courseBg} />
                    }
                    <h1>CodeIT Introduction</h1>
                </button>

                <button onClick={(e) => handleCourseClicked(e, 1)}>
                    {
                        selectedCourse === 1 ?
                            <SelectedBG className={styles.courseBg} style={{
                                borderColor: '#68B2FF'
                            }} />
                            : <IntroBG className={styles.courseBg} />
                    }
                    <h1>CodeIT Essentials</h1>
                </button>

                <button onClick={(e) => handleCourseClicked(e, 2)}>
                    {
                        selectedCourse === 2 ?
                            <SelectedBG className={styles.courseBg} style={{
                                borderColor: '#68B2FF'
                            }} />
                            : <IntroBG className={styles.courseBg} />
                    }
                    <h1>CodeIT Advanced</h1>
                </button>

                <button onClick={(e) => handleCourseClicked(e, 3)}>
                    {
                        selectedCourse === 3 ?
                            <SelectedBG className={styles.courseBg} style={{
                                borderColor: '#68B2FF'
                            }} />
                            : <IntroBG className={styles.courseBg} />
                    }
                    <h1>Cyber Intro</h1>
                </button>
            </div>

            {error && <div className={styles.errorContainer}>Select a course</div>}
        </div>
    )
}

export default CourseSelection