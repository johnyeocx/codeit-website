import React, { useContext } from 'react';
import AppContext from '../../AppContext';

import styles from '../../styles/Home/Landing.module.scss';
import RippleButton from '../Reusables/RippleButton/RippleButton';
import landingImage from '../../assets/Home/landing.png';
import Image from 'next/image';
import TextEditor from '../Reusables/TextEditor/TextEditor';
import { useRouter } from 'next/router';

export const scrollToElement = (id) => {
    let nextSection = document.querySelector(id);
    let y = nextSection.getBoundingClientRect().top - 80;
    document.getElementById("home-container").scrollBy({
        top: y,
        behavior: "smooth"
    });
}

function Landing() {
    const value = useContext(AppContext);
    let { isMobile } = value.state;
    const router = useRouter()

    return (
        <div className={styles.landingContainer} id="home-landing">
            <div className={styles.containerLeft}>
                <div className={styles.container1}>
                    <h1>
                        Gain an <span>edge</span>,
                        <br />
                        Learn to <span>codeit</span> now.
                    </h1>
                </div>

                <div className={styles.container2}>
                    <div className={styles.left}>
                        <p><span>80%</span> of students fail to self-learn programming.
                        </p>
                        {/* <br /> */}
                        <p>Be the <span>20%.</span></p>
                    </div>
                    {isMobile && (
                        <div className={styles.right}>
                            <Image className={styles.landingImage} src={landingImage}
                                width={
                                    isMobile && "250px"
                                }
                            />
                        </div>
                    )}
                </div>

                <div className={styles.container3}>
                    <div className={styles.rippleButtonContainer}>
                        <RippleButton
                            text="Register Now"
                            type="primary"
                            height={100}
                            onClick={() => router.push('/register')}
                        />
                    </div>
                    <div className={styles.rippleButtonContainer}>
                        <RippleButton
                            text="Learn More"
                            type="secondary"
                            height={100}
                            onClick={() => scrollToElement("#USP-container")}
                        />
                    </div>
                </div>
            </div>

            {!isMobile && (
                <div className={styles.containerRight}>
                    <TextEditor />
                </div>
            )}

        </div>
    )
}

export default Landing