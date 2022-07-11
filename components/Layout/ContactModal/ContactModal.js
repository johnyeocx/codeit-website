import React from 'react';
import styles from '../../../styles/Layout/Navbar.module.scss';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';
import { FaTelegramPlane } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { GrLinkedinOption } from 'react-icons/gr'
import { useRouter } from 'next/router';

function ContactModal() {
    const router = useRouter();

    return (
        <div className={styles.contactModal}>
            <button
                className={styles.contactLinkContainer}
                target="_blank"
                onClick={() => {
                    window.open('mailto:admin@codeitacademy.com', '_ blank')
                }}
            >
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
    )
}

export default ContactModal