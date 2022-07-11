import React from 'react';
import styles from '../../styles/Courses/CourseTeachers.module.scss';
import Image from 'next/image';
import RippleButton from '../Reusables/RippleButton/RippleButton';

function CourseTeachers({ teachersRef, teachers, bgColor }) {
    return (
        <div
            className={styles.container}
            id="course-teachers"
        >
            <div className={styles.container1}>
                <h1>Meet your teachers</h1>
                <div />
            </div>

            <div className={styles.container2}>
                {
                    teachers.map((teacher, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.teacherCard}
                            >

                                <div className={styles.imgContainer}>
                                    <Image
                                        objectFit='cover'
                                        layout="fill"
                                        src={teacher.image}
                                    />
                                </div>

                                <div className={styles.teacherDetails}
                                    style={{ marginLeft: 20 }}
                                >
                                    <h3>{teacher.name}</h3>
                                    <h4>{teacher.company}</h4>
                                    <h4>{teacher.degree}</h4>
                                </div>

                            </div>
                        )
                    })
                }
            </div >
            <div className={styles.container3}>
                <div className={styles.btnContainer}>
                    <RippleButton text="See More" />
                </div>
            </div>
        </div >
    )
}

export default CourseTeachers