import React from 'react';
import styles from '../../styles/Courses/CourseTeachers.module.scss';
import Image from 'next/image';
import RippleButton from '../Reusables/RippleButton/RippleButton';
import { useRouter } from 'next/router';

function CourseTeachers({ bgSecondary, teachersRef, teachers, bgColor }) {
    const router = useRouter();
    return (
        <div
            className={styles.container}
            id="course-teachers"
            style={{ backgroundColor: bgSecondary }}
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
                                        layout="fixed"
                                        width={100}
                                        height={130}
                                        src={teacher.image}
                                    />
                                </div>

                                <div className={styles.teacherDetails}>
                                    <h3>{teacher.name}</h3>
                                    <h4>{teacher.company}</h4>
                                    <h4>{teacher.degree}</h4>
                                    <h4>{teacher.school}</h4>
                                </div>

                            </div>
                        )
                    })
                }
            </div >
            <div className={styles.container3}>
                <div className={styles.btnContainer}>
                    <RippleButton text="See More" onClick={() => router.push('/our-team')} />
                </div>
            </div>
        </div >
    )
}

export default CourseTeachers