import React, { useEffect, useState } from 'react'
import styles from '../../styles/Deposit/Deposit.module.scss';
import Div100vh from 'react-div-100vh';
import { getUpcomingCourses } from '../../api/api';
import { format } from 'date-fns';
import Basic from '../../components/Deposit/01_Basic';
import Details from '../../components/Deposit/02_Details';

function DepositPage() {
    const [loading, setLoading] = useState(true)
    const [upcomingCourses, setUpcomingCourses] = useState(null)

    const [depositDetails, setDepositDetails] = useState({
        selectedCourse: 0,
        first_name: "",
        last_name: "",
        email: "",
        birthDate: "",
        mobileNumber: "",
    })

    const [emailFound, setEmailFound] = useState(false)
    const [page, setPage] = useState(1)

    const getUpcomingCoursesReq = async () => {
        setLoading(true);
        try {
            const res = await getUpcomingCourses()
            setUpcomingCourses(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getUpcomingCoursesReq();
    }, [])

    const getCourseString = (index) => {
        if (!upcomingCourses) return;

        const course = upcomingCourses[index]
        const dateString = format(new Date(course.start_date), 'dd LLL yyyy')

        return `${course.name}, ${dateString}, ${course.time}`
    }

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <Div100vh>
            <div className={styles.mainContainer}>
                <div className={styles.topContainer}>
                    <h1>CodeIT Course Deposit</h1>
                    <p>
                        This page is for you to make a deposit on a particular course. When a deposit is made,
                    </p>
                </div>

                {/* Header */}
                {page == 1 ? (
                    <Basic
                        upcomingCourses={upcomingCourses}
                        setUpcomingCourses={setUpcomingCourses}
                        depositDetails={depositDetails}
                        setDepositDetails={setDepositDetails}
                        page={page}
                        setPage={setPage}
                        emailFound={emailFound}
                        setEmailFound={setEmailFound}
                    />
                ) : page == 2 ? (
                    <Details
                        page={page}
                        setPage={setPage}
                        depositDetails={depositDetails}
                        setDepositDetails={setDepositDetails}
                        emailFound={emailFound}
                        setEmailFound={setEmailFound}
                        upcomingCourses={upcomingCourses}
                    />
                    // <div>Page 2
                    //     <button onClick={() => {
                    //         setTimeout(() => {
                    //             setPage(page - 1)
                    //         }, 300)
                    //     }
                    //     }>
                    //         Here
                    //     </button>
                    // </div>
                ) : null}

            </div>
        </Div100vh>
    )
}

export default DepositPage
