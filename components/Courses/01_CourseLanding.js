import React, { useEffect, useContext } from 'react';
import styles from '../../styles/Courses/CourseLanding.module.scss';
import AppContext from '../../AppContext';
import RippleButton from '../Reusables/RippleButton/RippleButton';
import IntroLanding from '../../assets/Courses/Intro/Landing.jpg';
import Image from 'next/image';
import { useRouter } from 'next/router';

function CourseLanding() {
    const value = useContext(AppContext);
    let { bgColor } = value.state;
    let { setBgColor } = value;
    const router = useRouter();

    const scrollToElement = (id) => {
        let nextSection = document.querySelector(id);
        let y = nextSection.getBoundingClientRect().top - 80;
        document.getElementById("course-details").scrollBy({
            top: y,
            behavior: "smooth"
        });
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.left}>
                <div className={styles.containerTop}>
                    <h1>CodeIT Intro</h1>
                    <h4>Online | 3 weeks</h4>
                    <p>
                        Afraid of those months long full time bootcamps?
                        Want a hassle and commitment free entry into the world of programming?
                        <span> CodeIT Intro</span> was made for you.
                    </p>
                </div>
                <div className={styles.containerBottom}>
                    <div className={styles.btnContainer}>
                        <RippleButton
                            text="Register Now"
                            type="primary"
                            onClick={() => router.push({
                                pathname: '/register',
                                query: { course: 'intro' }
                            })}
                        />
                    </div>
                    <div className={styles.btnContainer}>
                        <RippleButton text="I'm not convinced..." onClick={() => scrollToElement("#course-usp")} />
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.imgContainer}>

                    <Image
                        layout='fill'
                        objectFit='cover'
                        width={300}
                        height={400}
                        src={IntroLanding}
                        className={styles.img}
                    />
                </div>
            </div>

        </div >
    )
}

export default CourseLanding