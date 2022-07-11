import React from 'react';
import styles from '../../styles/Courses/CourseUSP.module.scss';
import TimeIcon from '../../assets/Courses/Intro/TimeIcon.svg';
import ExpertIcon from '../../assets/Courses/Intro/ExpertIcon.svg';
import CheapIcon from '../../assets/Courses/Intro/CheapIcon.svg';

function CourseUSP() {
    const benefits = [
        {
            title: 'Duration',
            description: 'Time is money. In just three (short & sweet) weeks, you will gain the skills necessary to combine your programming skills with everyday life problems',
            icon: () => <TimeIcon className={styles.benefitIcon} />,
        },
        {
            title: 'Expertise',
            description: 'Coming from both educational institutions and top tech firms, our teachers bring the best of both worlds to teach you the best knowledge, in the best way',
            icon: () => <ExpertIcon className={styles.benefitIcon} />,
        },
        {
            title: 'Affordable',
            description: "Why pay 5 figures for a bootcamp when you aren't even sure of your interest for the subject? Start your journey cost free (nearly) that gets even better with our several subsidies!",
            icon: () => <CheapIcon className={styles.benefitIcon} />,
        }
    ]

    return (
        <div id="course-usp" className={styles.container}>
            <div className={styles.container1}>
                <h1>Why start with us?</h1>
                <div />
            </div>
            <div className={styles.container2}>
                {benefits.map((benefit, index) => {
                    return (
                        <div
                            key={index}
                            className={styles.benefitContainer}
                        >
                            <div className={styles.benefitHeader}>
                                {benefit.icon()}
                                <h2>{benefit.title}</h2>
                            </div>
                            <p>{benefit.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CourseUSP