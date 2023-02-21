import React, { useEffect, useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { voucherClaimRequest } from '../../../api/api';
import Div100vh from 'react-div-100vh';
import Image from 'next/image';

import styles from '../../../styles/Home/Popup.module.scss';
import rippleStyles from '../../../styles/Components/RippleButton.module.scss';
import RegisterInput from '../../Reusables/RegisterInput/RegisterInput';
import TickSVG from '../../../assets/TickSVG.svg'
import CodingPhoto from '../../../assets/Coding.jpg';

function Popup({ popupOpen, setPopupOpen, bgColor }) {
    const containerRef = useRef(null);
    const inputRefs = useRef({});
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        voucherCode: ""
    })
    const [error, setError] = useState([]);

    const checkDetailsInput = () => {
        let errors = []
        for (let key in details) {
            if (!details[key]) {
                let newError = {
                    type: key,
                    message: `${key} blank`

                }
                errors.push(newError)
                continue;
            }

            if (key === "email" && !validateEmail(details[key])) {
                errors.push({
                    type: "email",
                    message: "invalid email"
                })
            }
        }
        setError(errors)
        return errors.length === 0
    }

    function validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        return false
    }

    const handleRegisterBtn = async () => {
        setSubmitting(true)
        let valid = checkDetailsInput();
        if (!valid) {
            setSubmitting(false);
            return;
        };

        try {
            const data = await voucherClaimRequest(details)
            if (data.status != 200) return;

        } catch (error) {
            console.log(error);
            setSubmitting(false);
            return;
        }

        setSubmitting(false);
        setSuccess(true);
        setTimeout(() => setPopupOpen(false), 1000);
    }

    useEffect(() => {
        setDetails({
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            voucherCode: ""
        })
        setSubmitting(false);
        setSuccess(false);
    }, [popupOpen])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setPopupOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <Div100vh className={`${styles.popupContainer} ${!popupOpen && styles.popupClosed}`}>
                <div className={styles.mainContainer} ref={containerRef}>
                    <div className={styles.left}>
                        <Image className={styles.image} alt='' layout='fill' src={CodingPhoto} objectFit="cover" />
                        <div className={styles.gradient}></div>
                    </div>

                    <div className={styles.contentContainer}>
                        <h1>
                            SMU & NUS Students
                            <br />
                            Claim your vouchers
                        </h1>
                        <div className={styles.middleContainer}>
                            <RegisterInput
                                required={true}
                                error={error.findIndex((elem) => elem.type === "firstName") != -1}
                                index={1}
                                label="First Name"
                                width="100%"
                                inputRefs={inputRefs}
                                value={details.firstName}
                                setValue={(e) => {
                                    setDetails({ ...details, firstName: e.target.value })
                                }}
                            />
                            <RegisterInput
                                required={true}
                                error={error.findIndex((elem) => elem.type === "lastName") != -1}
                                index={2}
                                label="Last Name"
                                width="100%"
                                inputRefs={inputRefs}
                                value={details.lastName}
                                setValue={(e) => {
                                    setDetails({ ...details, lastName: e.target.value })
                                }}
                            />
                            <RegisterInput
                                required={true}
                                error={error.findIndex((elem) => elem.type === "email") != -1}
                                index={3}
                                label="Email"
                                width="100%"
                                inputRefs={inputRefs}
                                value={details.email}
                                setValue={(e) => {
                                    setDetails({ ...details, email: e.target.value })
                                }}
                            />
                            <RegisterInput
                                required={true}
                                error={error.findIndex((elem) => elem.type === "mobile") != -1}
                                index={4}
                                label="Mobile Number"
                                width="100%"
                                inputRefs={inputRefs}
                                value={details.mobile}
                                setValue={(e) => {
                                    setDetails({ ...details, mobile: e.target.value })
                                }}
                            />
                            <RegisterInput
                                required={true}
                                error={error.findIndex((elem) => elem.type === "voucherCode") != -1}
                                index={5}
                                label="Voucher Code"
                                width="100%"
                                inputRefs={inputRefs}
                                value={details.voucherCode}
                                setValue={(e) => {
                                    setDetails({ ...details, voucherCode: e.target.value })
                                }}
                            />
                        </div>

                        <div className={styles.btnContainer}>
                            <button
                                className={
                                    submitting || success ?
                                        `${rippleStyles.rippleButtonSubmitting} ${rippleStyles.rpSecondary}` :
                                        `${rippleStyles.rippleButton} ${rippleStyles.rpSecondary}`
                                }
                                onClick={() => handleRegisterBtn()}
                            >
                                {
                                    submitting ? (
                                        <div className="spinner">Hello</div>
                                    ) : success ? (
                                        <div>
                                            <TickSVG style={{ width: '25px', marginTop: '6px', color: 'white', zIndex: 10 }} />
                                        </div>
                                    ) : (
                                        <>Register Now</>
                                    )
                                }

                            </button>
                        </div>
                        <button onClick={() => {
                            setPopupOpen(false)
                        }}>
                            <IoMdCloseCircle className={styles.closeIcon} />
                        </button>
                    </div>
                </div>
            </Div100vh>
            <button
                className={styles.topbarContainer}
                style={{ backgroundColor: bgColor }}
                onClick={() => setPopupOpen(true)}
            >
                <p>SMU & NUS Students: <b>Claim your vouchers!</b></p>
            </button>
        </>

    )
}

export default Popup