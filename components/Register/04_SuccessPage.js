import React from 'react';
import styles from '../../styles/Register/SuccessPage.module.scss';
import RippleButton from '../Reusables/RippleButton/RippleButton';
import SuccessSVG from './success.svg';
import { useRouter } from 'next/router';

function SuccessPage({ selectedPage, selectedCourse }) {

    const router = useRouter();
    const courseMap = ["CodeIT Intro", "CodeIT Essentials", "CodeIT Advanced"]

    return (

        <div className={styles.container}>
            {
                selectedPage === 3 &&
                (
                    <>
                        <div className={styles.animationCtn}>
                            <div className={`${styles.icon} ${styles.iconOrderSuccess} ${styles.svg}`}>
                                <SuccessSVG />
                            </div>

                        </div>
                        <div className={styles.containerMiddle}>
                            <h5>You have successfully registered for {courseMap[selectedCourse]}</h5>
                            <p>
                                Thank you for registering with us! We will contact you shortly to answer any questions you have regarding our courses as well as help you with the subsidy application and how to proceed with enrolment.
                                You should have received an acknowledgement email from admin@codeitacademy.com.
                                If you have not, please <a
                                    style={{ textDecoration: 'underline', color: '#006FFF' }}
                                    target="_blank"
                                    href=" https://api.whatsapp.com/send/?phone=6583718250&text&type=phone_number&app_absent=0">
                                    WhatsApp us at +65 8371 8250
                                </a> to enquire about the status of your registration.
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
                    </>
                )
            }
        </div>
    )
}

export default SuccessPage