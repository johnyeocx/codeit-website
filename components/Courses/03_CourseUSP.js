import React from 'react';
import styles from '../../styles/Courses/CourseUSP.module.scss';
import TimeIcon from '../../assets/Courses/Intro/TimeIcon.svg';
import ExpertIcon from '../../assets/Courses/Intro/ExpertIcon.svg';
import CheapIcon from '../../assets/Courses/Intro/CheapIcon.svg';

function CourseUSP({ benefits, title }) {

    return (
        <div id="course-usp" className={styles.container}>
            <div className={styles.container1}>
                <h1>{`Why learn ${title.toLowerCase()}?`}</h1>
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