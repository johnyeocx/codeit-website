import React from 'react';
import styles from '../../styles/Courses/CourseRegister.module.scss';
import RippleButton from '../Reusables/RippleButton/RippleButton';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdOutlineAttachMoney } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

function CourseRegister({ signup, coursePath }) {
    const router = useRouter();
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
                                    <td>{signup.nextRun.date}</td>
                                </tr>
                                <tr>
                                    <td>Time</td>
                                    <td>{signup.nextRun.time}</td>
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
                                    <td>{`${signup.pricing.student}SGD`}</td>
                                </tr>
                                <tr>
                                    <td>Public</td>
                                    <td>{`${signup.pricing.public}SGD`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <p>
                    <span>Note:</span> This course is approved under the IMDA iPrep Subsidy. All computing students in Singapore universities are
                    eligible to claim these subsidies. All who are eligible will receive a <b>500SGD reimbursement</b> of the course under this scheme.
                    {/* <Link href="/"><a> Learn More Here</a></Link> */}
                </p>
            </div>
            <div className={styles.container3}>
                <div className={styles.btnContainer}>
                    <RippleButton
                        text="Register Now"
                        type="primary"
                        onClick={() => router.push(`/register?course=${coursePath}`)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CourseRegister