import React, { useContext, useEffect, useRef, useState } from 'react'
import Div100vh from 'react-div-100vh'
import AppContext from '../../AppContext';
import styles from '../../styles/Payment/Payment.module.scss';
import { getUpcomingCourses } from '../../api/api';
import { parse } from 'date-fns';
import PaymentDetails from '../../components/Payment/01_PaymentDetails';
import OrderSummary from '../../components/Payment/03_OrderSummary';
import BillingAddress from '../../components/Payment/02_BillingAddress';
import { useRouter } from 'next/router'

function Payment() {
    const value = useContext(AppContext);
    let { dimensions } = value.state;
    let { setBgColor } = value;

    const [courses, setCourses] = useState(null)
    const [loading, setLoading] = useState(false)

    const [paymentDetails, setPaymentDetails] = useState({
        deposit_code: "",
        selectedCourse: "",
        email: "",
        first_name: "",
        last_name: "",
        mobile_number: "",
        birth_date: null,
        discount_code: "",
    })

    const [billingAddressDetails, setBillingAddressDetails] = useState({
        address: "",
        country: "",
        postal_code: "",
    })

    const [errors, setErrors] = useState({
        deposit_code: "",
        selectedCourse: "",
        email: "",
        first_name: "",
        last_name: "",
        mobile_number: "",
        birth_date: "",
        discount_code: "",
        address: "",
        country: "",
        postal_code: "",
    })

    const [emailLoading, setEmailLoading] = useState(false)
    const [depositLoading, setDepositLoading] = useState(false)

    const [fieldsLocked, setFieldsLocked] = useState({
        first_name: false,
        last_name: false,
        mobile_number: false,
        birth_date: false,
        selected_course: false
    })
    const [emailFound, setEmailFound] = useState(null)
    const [depositFound, setDepositFound] = useState(null)
    const [depositInfo, setDepositInfo] = useState(null)
    const [discountInfo, setDiscountInfo] = useState(null)
    
    const [page, setPage] = useState(1)


    const router = useRouter()

    useEffect(() => {
        getUpcomingCoursesReq();
        setBgColor("white")

        const params = router.query
        const birth_date = params.birth_date
            ? parse(params.birth_date, "dd-MM-yy", new Date()) : null;
        setPaymentDetails({
            ...paymentDetails,
            first_name: params.first_name,
            last_name: params.last_name,
            email: params.email,
            mobile_number: params.mobile_number,
            birth_date: birth_date,
        })
    }, [])

    const getUpcomingCoursesReq = async () => {
        setLoading(true);
        try {
            const res = await getUpcomingCourses()
            setCourses(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    return (
        <Div100vh>
            <div className={styles.mainContainer}>
                <div className={styles.topContainer}>
                    <h1>Enroll Now</h1>
                </div>
                <div className={styles.middleContainer}>
                    <div className={styles.left}>
                        <div className={styles.paymentDetails}>
                            {
                                page == 1 ? (
                                    <PaymentDetails
                                        emailLoading={emailLoading}
                                        setEmailLoading={setEmailLoading}
                                        depositLoading={depositLoading}
                                        setDepositLoading={setDepositLoading}
                                        paymentDetails={paymentDetails}
                                        setPaymentDetails={setPaymentDetails}
                                        emailFound={emailFound}
                                        setEmailFound={setEmailFound}
                                        depositFound={depositFound}
                                        setDepositFound={setDepositFound}

                                        depositInfo={depositInfo}
                                        setDepositInfo={setDepositInfo}
                                        discountInfo={discountInfo}
                                        setDiscountInfo={setDiscountInfo}

                                        fieldsLocked={fieldsLocked}
                                        setFieldsLocked={setFieldsLocked}
                                        courses={courses}
                                        setCourses={setCourses}
                                        setPage={setPage}
                                        page={page}
                                    />
                                ) : (
                                    <BillingAddress
                                        setPage={setPage}
                                        page={page}
                                        billingAddressDetails={billingAddressDetails}
                                        setBillingAddressDetails={setBillingAddressDetails}
                                    />
                                )
                            }
                        </div>

                    </div>
                    <div className={styles.right}>

                        <div className={styles.orderSummary}>
                            <OrderSummary
                                paymentDetails={paymentDetails}
                                courses={courses}
                                depositInfo={depositInfo}
                                discountInfo={discountInfo}
                                billingAddressDetails={billingAddressDetails}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </Div100vh >
    )
}

export default Payment