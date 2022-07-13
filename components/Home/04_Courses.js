import React from 'react';
import styles from '../../styles/Home/Courses.module.scss';
import CourseCard from './CourseCard/CourseCard';

import PlayButton from '../../assets/Home/Courses/PlayButton.svg'
import NextButton from '../../assets/Home/Courses/NextButton.svg'
import ForwardButton from '../../assets/Home/Courses/ForwardButton.svg'
import { ciEssentials, ciIntro } from '../Courses/courseData';

const courses = [
    {
        title: "CodeIT Intro",
        subtitle: "For those with",
        emphasis: "no experience",
        upcoming: ciIntro.signup.nextRun.date,
        length: "3 Weeks",
        color: "#FF9D87",
        icon: PlayButton,
        link: "intro"
    },
    {
        title: "CodeIT Essentials",
        subtitle: "For those with",
        emphasis: "some experience",
        upcoming: ciEssentials.signup.nextRun.date,
        length: "6 Weeks",
        color: "#75B8FF",
        icon: NextButton,
        link: "essentials"
    },
    {
        title: "CodeIT Advanced",
        subtitle: "For those with",
        emphasis: "a lot experience",
        upcoming: "TBC",
        length: "6 Weeks",
        color: "#8F90F7",
        icon: ForwardButton,
        link: "advanced"
    },
]

function Courses() {

    return (
        <div id="home-courses-container" className={styles.coursesContainer}>
            <div className={styles.titleContainer}>
                <h1>
                    Courses for<span> every level</span>
                </h1>
                <div />
            </div>
            <div className={styles.mainContainer}>
                {
                    courses.map((course, index) => {
                        return (
                            <CourseCard
                                key={index}
                                Icon={course.icon}
                                title={course.title}
                                subtitle={course.subtitle}
                                length={course.length}
                                emphasis={course.emphasis}
                                upcoming={course.upcoming}
                                color={course.color}
                                link={course.link}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Courses