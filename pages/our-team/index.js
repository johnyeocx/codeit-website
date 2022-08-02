import React, { useEffect, useContext } from 'react';
import Div100vh from 'react-div-100vh';
import AppContext from '../../AppContext';
import TeacherCard from '../../components/Team/TeacherCard';
import { advisors, teachers } from '../../components/Team/teachers';
import styles from '../../styles/Team/Team.module.scss';

function OurTeam() {
    const value = useContext(AppContext);
    let { isMobile, dimensions } = value.state;
    let { bgColor } = value.state;
    let { setBgColor } = value;

    useEffect(() => {
        setBgColor("#FFFDFD")
    }, [])

    return (
        <Div100vh >
            <div className={styles.container} style={{ backgroundColor: bgColor }}>
                <div className={styles.containerTop}>
                    <h4 style={{ textAlign: 'center' }}>The best way to learn is from those you strive to be.</h4>
                </div>

                <h1 className={styles.title}>Course Advisors</h1>
                <div className={`${styles.containerMiddle} ${styles.advisorContainer}`}>
                    {advisors.map((teacher, index) => {
                        return (
                            <TeacherCard key={index} teacher={teacher} />
                        )
                    })}
                </div>

                <h1 className={styles.title}>Teachers</h1>
                <div className={`${styles.containerMiddle} ${styles.teachersContainer}`}>
                    {teachers.map((teacher, index) => {
                        return (
                            <TeacherCard key={index} teacher={teacher} />
                        )
                    })}
                </div>
            </div>
        </Div100vh>

    )
}

export default OurTeam