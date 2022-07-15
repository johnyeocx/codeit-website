import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/Layout/MobileContactModal.module.scss';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';
import { FaTelegramPlane } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { GrLinkedinOption } from 'react-icons/gr'
import { useRouter } from 'next/router';

function MobileContactModal({
    modalOpen,
    setModalOpen,
    contactModalClicked,
    setContactModalClicked,
}) {

    const contentRef = useRef(null);
    const [containerClass, setContainerClass] = useState(styles.noContainer)
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1)
        if (count < 1) return;
        if (modalOpen) {
            setContainerClass(styles.container)
        }
        else {
            setContainerClass(`${styles.container} ${styles.containerClosed}`)
        }
    }, [modalOpen])


    useEffect(() => {

        const handleClickOutside = (e) => {
            if (contentRef.current && !contentRef.current.contains(e.target)) {
                setModalOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const getContainerClass = () => {
        if (modalOpen) {
            return styles.container
        } else {
            return `${styles.container} ${styles.containerClosed}`
        }
    }
    return (
        <>{
            // modalOpen &&
            <div
                className={`${containerClass}`}
            >
                <div ref={contentRef} className={
                    `${styles.contactModal} ${!modalOpen && styles.contactModalClosed}`
                } >
                    <button target="_blank" onClick={() => {
                        window.open('mailto:admin@codeitacademy.com', '_ blank')
                    }}>
                        <p>Email</p>
                        <div className={styles.iconFill} id={styles.emailIcon}>
                            <MdEmail
                                className={styles.icon}
                            />
                        </div>
                    </button>
                    <button target="_blank" onClick={() => {
                        window.open('https://api.whatsapp.com/send/?phone=6583718250&text&type=phone_number&app_absent=0', '_ blank')
                    }}>
                        <p>Whatsapp</p>
                        <div className={styles.iconFill} id={styles.whatsappIcon}>
                            <IoLogoWhatsapp
                                className={styles.icon}
                            />
                        </div>
                    </button>

                    <button onClick={() => {
                        window.open('https://t.me/CodeITAcademy', '_ blank')
                    }}>
                        <p>Telegram</p>
                        <div className={styles.iconFill} id={styles.teleIcon}>
                            <FaTelegramPlane
                                className={styles.icon}
                            />
                        </div>
                    </button>

                    <button onClick={() => {
                        window.open('https://www.instagram.com/codeit.academy/', '_ blank')
                    }}>
                        <p>Instagram</p>
                        <div className={styles.iconFill} id={styles.instaIcon}>
                            <RiInstagramFill
                                className={styles.icon}
                            />
                        </div>
                    </button>

                    <button onClick={() => {
                        window.open('https://www.linkedin.com/company/codeitacademy', '_ blank')
                    }}>
                        <p>LinkedIn</p>
                        <div className={styles.iconFill} id={styles.linkedIcon}>
                            <GrLinkedinOption
                                className={styles.icon}
                            />
                        </div>
                    </button>
                </div>
            </div>
        }

        </>

    )
}

export default MobileContactModal