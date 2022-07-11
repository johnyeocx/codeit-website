import React from 'react';
import styles from '../../styles/Courses/CourseRegister.module.scss';
import RippleButton from '../Reusables/RippleButton/RippleButton';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdOutlineAttachMoney } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

function CourseRegister() {
    return (
        <div id="course-signup" className={styles.container}>
            <div className={styles.container1}>
                <h1>How can I join?</h1>
                <div />
            </div>

            <div className={styles.container2}>
                <div className={styles.nextRunContainer} id="course-signup">
                    <div className={styles.header}>
                        <AiOutlineCalendar className={styles.calendarIcon} />
                        <h2>Next Run</h2>
                    </div>
                    <div>
                        <table className={styles.scheduleTable}>
                            <tbody>
                                <tr>
                                    <td>Date</td>
                                    <td>Aug 13 - Aug 27</td>
                                </tr>
                                <tr>
                                    <td>Time</td>
                                    <td>9:00am - 12:00pm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.nextRunContainer} id="course-pricing">
                    <div className={styles.header}>
                        <MdOutlineAttachMoney className={styles.calendarIcon} />
                        <h2>Pricing</h2>
                    </div>
                    <div>
                        <table className={`${styles.scheduleTable} ${styles.pricing}`}>
                            <tbody>
                                <tr>
                                    <td>Student</td>
                                    <td>250SGD</td>
                                </tr>
                                <tr>
                                    <td>Public</td>
                                    <td>500SGD</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>

                <p>
                    <span>Note:</span> This course is approved under the IMDA iPrep Subsidy. All computing students in Singapore universities are
                    eligible to claim these subsidies. Contact us for more info.
                    <Link href="/"><a> Learn More Here</a></Link>
                </p>
            </div>
            <div className={styles.container3}>
                <div className={styles.btnContainer}>
                    <RippleButton
                        text="Register Now"
                        type="primary"
                    />
                </div>
            </div>
        </div>
    )
}

export default CourseRegister