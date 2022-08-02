
import React from 'react';
import styles from '../../styles/Team/TeacherCard.module.scss'
import Image from 'next/image';


function TeacherCard({ teacher }) {
    // console.log(teacher);
    return (
        <div className={styles.teacherCard}>
            <div className={styles.cardContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.imgContainer}>
                        <Image className={styles.img} layout='fill' objectFit='cover' src={teacher.image} />
                    </div>
                    <div className={styles.line} />

                    <div className={styles.titleContainer}>
                        <h2>{teacher.name}</h2>
                        <h3>{teacher.company}</h3>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <ul>
                        <p style={{ fontWeight: '600', fontSize: 14 }}>Experience</p>
                        {teacher.credentials.map((credential) => (
                            <li>
                                {`${credential}`}
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

        </div>
    )
}

export default TeacherCard