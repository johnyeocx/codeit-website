import { Button, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import moment from 'moment';
import React, { useState } from 'react'
import { FaLock } from 'react-icons/fa';
import { payRequest, simulatePaymentNotification } from '../../api/api';
import styles from '../../styles/Payment/Payment.module.scss'
import { validateEmail } from '../constants';

function OrderSummary({
    paymentDetails,
    courses,
    depositInfo,
    discountInfo,
    errors,
    billingAddressDetails
}) {
    const [loading, setLoading] = useState(false)

    const handleCheckoutClicked = async () => {
        setLoading(true);
        try {
            const reqBody = {
                "course_id": courses[paymentDetails.selectedCourse].course_id,
                "first_name": paymentDetails.first_name,
                "last_name": paymentDetails.last_name,
                "email": paymentDetails.email,
                "deposit_code": paymentDetails.deposit_code,
                "discount_code": paymentDetails.discount_code,
                "mobile_number": paymentDetails.mobile_number,
                "birth_date": moment(paymentDetails.birth_date).format("YYYY-MM-DD"),
                address: billingAddressDetails.address,
                country: billingAddressDetails.country.label,
                postal_code: billingAddressDetails.postal_code
            }

            const res = await payRequest(reqBody)
            console.log(res)
            if (!res.data) {
                throw new Error("Something went wrong")
            }

            // window.location.href = res.data.payment_url
            await simulatePaymentNotification({
                bill_ref_no: res.data.bill_ref_no
            })

            setLoading(false)
        } catch (error) {
            console.log("Failed to make checkout request:", error)
            setLoading(false);
            // display error message
        }
    }

    const checkoutDisabled = () => {
        for (let key in paymentDetails) {
            if (key == "selectedCourse" && paymentDetails[key] === "") {
                console.log("Failure 1")
                return true
            }

            if (
                key != "deposit_code"
                && key != "discount_code"
                && key != "selectedCourse"
                && !paymentDetails[key]
            ) {
                console.log("Failure 2")
                return true
            }

            if (key == "email" && !validateEmail(paymentDetails[key])) {
                console.log("Failure 3")
                return true
            }
        }

        for (let key in billingAddressDetails) {
            if (!billingAddressDetails[key]) {
                console.log(key)
                return true
            }
        }
        return false
    }

    const formatCourseTiming = (course) => {
        const dateString = format(new Date(course.start_date), 'dd LLL yyyy')
        return `${dateString}, ${course.time}`
    }

    const formatPrice = (price) => {
        return (Math.round(price * 100) / 100).toFixed(2)
    }

    const formatFinalPrice = (price, deposit_info, discountInfo) => {
        const finalPrice = price;

        if (discountInfo !== null) {
            finalPrice -= calculateDiscount(discountInfo, price)
        }

        if (depositInfo !== null) {
            finalPrice -= deposit_info.payment_amount
        }

        return (Math.round(finalPrice * 100) / 100).toFixed(2)
    }

    const calculateDiscount = (discount_info, price) => {
        const type = discount_info["type"]
        const amount = discount_info["amount"]
        if (type == "subtraction") {
            return amount
        } else {
            return price * (amount)
        }
    }

    return (
        <div className={styles.summaryContainer}>
            <div className={styles.header}>
                <h3>
                    Order Summary
                </h3>
            </div>

            {
                paymentDetails.selectedCourse === "" ? (
                    <div className={styles.noCourseText}>
                        Select a course to view your checkout summary
                    </div>
                ) : (
                    <div className={styles.summaryContent}>
                        <div className={styles.summaryRow}>
                            <span>Course: </span>
                            <p>{courses[paymentDetails.selectedCourse].name}</p>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Timing: </span>
                            <p>{formatCourseTiming(courses[paymentDetails.selectedCourse])}</p>
                        </div>



                        <div className={styles.summarySeparator} />

                        <div className={styles.summaryRow}>
                            <span>Initial Price: </span>
                            <p >{`${formatPrice(
                                courses[paymentDetails.selectedCourse].price
                            )} SGD`.padStart(1, ' ')}</p>
                        </div>
                        {
                            depositInfo && (
                                <div className={styles.summaryRow}>
                                    <span>Deposit: </span>
                                    <p >{`-${formatPrice(depositInfo.payment_amount)} SGD`}</p>
                                </div>
                            )
                        }
                        {
                            discountInfo && (
                                <div className={styles.summaryRow}>
                                    <span>Discount: </span>
                                    <p >{`-${formatPrice(calculateDiscount(
                                        discountInfo,
                                        courses[paymentDetails.selectedCourse].price
                                    ))} SGD`}</p>
                                </div>
                            )
                        }

                        <div className={styles.summarySeparator} />

                        <div className={`${styles.summaryRow} ${styles.finalPriceText}`}>
                            <span>Final Price: </span>
                            <p className={styles.finalPriceText}>{`${formatFinalPrice(
                                courses[paymentDetails.selectedCourse].price, depositInfo, discountInfo
                            )} SGD`.padStart(1, ' ')}</p>
                        </div>

                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#8F90F7',
                                width: '100%',
                                height: 35
                            }}
                            disableElevation
                            onClick={() => {
                                handleCheckoutClicked()
                            }}
                            disabled={checkoutDisabled()}
                        >
                            {loading ? (
                                <CircularProgress style={{ padding: '10px', color: 'white' }} />
                            ) : checkoutDisabled() ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ marginRight: '10px' }}>checkout</p>
                                    <FaLock />
                                </div>

                            ) : (
                                <p>checkout</p>
                            )}
                        </Button>
                    </div>
                )
            }

        </div >
    )
}

export default OrderSummary