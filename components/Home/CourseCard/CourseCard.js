import React from 'react';
import styles from '../../../styles/Home/Courses.module.scss';
import { useRouter } from 'next/router';

function CourseCard({
    Icon,
    title,
    color,
    subtitle,
    emphasis,
    length,
    upcoming,
    link
}) {
    const router = useRouter()
    return (
        <div
            className={styles.courseCardContainer}
            style={{
                borderTop: `2px solid ${color}`
            }}
        >
            <div className={styles.cardTop}>
                <Icon className={styles.cardIcon} />
                <h2>{title}</h2>
            </div>

            <p className={styles.cardSubtitle}>
                {`${subtitle} `}
                <span
                    style={{
                        color,
                        fontWeight: '600'
                    }}
                >{emphasis}</span>
            </p>

            <h4>{`Online | ${length}`}</h4>

            <div
                style={{
                    width: '100%',
                    height: '1.5px',
                    backgroundColor: color,
                    borderRadius: '1px',
                }}
            />

            <div className={styles.upcoming}>
                <b>Upcoming: </b> {upcoming}
            </div>

            <div className={styles.bottomButtons}>
                <button className={styles.learnBtn}
                    style={{
                        backgroundColor: color
                    }}
                    onClick={() => {
                        router.push(`courses/${link}`)
                    }}
                >
                    Learn More
                </button>
                <button
                    className={styles.registerBtn}
                    style={{
                        color,
                        border: `2px solid ${color}`
                    }}
                    onClick={() => {
                        router.push({
                            pathname: '/register',
                            query: {
                                course: link
                            }
                        })
                    }}
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default CourseCard