import React, { useContext } from 'react';
import styles from '../../styles/Courses/CourseIntro.module.scss';
import IntroSVG from '../../assets/Courses/IntroSVG.svg';
import IntroLanding from '../../assets/Courses/Intro/Landing.jpg';
import Image from 'next/image';
import AppContext from '../../AppContext';
import { breakpoints } from '../constants';

function CourseIntro({ bgSecondary, title, overview }) {
    const value = useContext(AppContext);
    const { dimensions } = value.state

    return (
        <div className={styles.container} id="#course-intro"
            style={{ backgroundColor: bgSecondary }}
        >
            <div className={styles.left}>
                <div className={styles.container1}>
                    {dimensions.width < breakpoints.tablet && (
                        overview.svg()
                    )}
                    <div className={styles.titleContainer}>
                        <h1>{`What is CI ${title}`}</h1>
                        <div />
                    </div>
                </div>
                <div className={styles.container2}>
                    {overview.text(dimensions)}
                </div>
                <div className={styles.container3}>
                    <h4>{`Graduates: ${overview.graduates}+`}</h4>
                </div>
            </div>
        </div>
    )
}

export default CourseIntro