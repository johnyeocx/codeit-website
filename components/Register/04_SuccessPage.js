import React from 'react';
import styles from '../../styles/Register/SuccessPage.module.scss';
import RippleButton from '../Reusables/RippleButton/RippleButton';
import SuccessSVG from './success.svg';
import { useRouter } from 'next/router';

function SuccessPage({ selectedPage }) {
    const router = useRouter();
    return (

        <div className={styles.container}>
            {
                selectedPage === 4 &&
                (
                    <div>
                        <div class={styles.animationCtn}>
                            <div class={`${styles.icon} ${styles.iconOrderSuccess} ${styles.svg}`}>
                                <SuccessSVG />
                            </div>

                        </div>
                        <div className={styles.containerMiddle}>
                            <h5>You have successfully registered for {`CodeIT Advanced`}</h5>
                            <p>
                                Thank you for registering with us! We will contact you shortly to answer any queries you may have about the course and confirm your enrolment.

                                <br /><br />
                                Additionally, you should have received an acknowledgement email from admin@codeitacademy.com. If you have not, please send an email to this same address with the subject: Missing Confirmation.
                            </p>
                        </div>
                        <div className={styles.containerBottom}>
                            <div className={styles.btnContainer}>
                                <RippleButton
                                    text="Back to home"
                                    onClick={() => {
                                        router.push('/')
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SuccessPage