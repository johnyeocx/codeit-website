import React, { useContext } from 'react';
import styles from '../../styles/Courses/CourseIntro.module.scss';
import IntroSVG from '../../assets/Courses/IntroSVG.svg';
import IntroLanding from '../../assets/Courses/Intro/Landing.jpg';
import Image from 'next/image';
import AppContext from '../../AppContext';
import { breakpoints } from '../constants';

function CourseIntro() {
    const value = useContext(AppContext);
    const { dimensions } = value.state

    return (
        <div className={styles.container} id="#course-intro">
            <div className={styles.left}>
                <div className={styles.container1}>
                    {dimensions.width < breakpoints.tablet && (
                        <IntroSVG className={styles.introSvg} />
                    )}
                    <div className={styles.titleContainer}>
                        <h1>What is CI Intro</h1>
                        <div />
                    </div>
                </div>
                <div className={styles.container2}>
                    <p>
                        <span>CodeIT Intro</span> is an introductory course to programming in the Python language.
                        {
                            dimensions.width < breakpoints.tablet ? (
                                <><br /> <br /></>
                            ) : (<span> </span>)
                        }
                        Here, you will learn about principle methodologies that are universal to all
                        programming languages and develop the necessary competencies
                        to learn not just how to program, but how to engineer.
                    </p>
                </div>
                <div className={styles.container3}>
                    <h4>Graduates: 40</h4>
                </div>
            </div>
            <div className={styles.right}>
                {/* <div className={styles.imgContainer}>
                    <Image
                        layout='fill'
                        objectFit='cover'
                        width={300}
                        height={400}
                        src={IntroLanding}
                        className={styles.img}
                    />
                </div> */}
                {/* 
                <div className={styles.container3}>
                    <h4>Graduates: 40</h4>
                </div> */}
            </div>
        </div>
    )
}

export default CourseIntro