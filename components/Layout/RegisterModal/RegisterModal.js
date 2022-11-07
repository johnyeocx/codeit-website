import React from 'react'
import styles from '../../../styles/Layout/Navbar.module.scss';
import { MdContactPage } from 'react-icons/md'
import { MdClass } from 'react-icons/md'

import Link from 'next/link';
import { GrContact } from 'react-icons/gr'

function RegisterModal() {
    return (
        <div className={styles.contactModal}>
            <Link
                href="/register"
            >
                <button
                    className={styles.contactLinkContainer}>
                    <p>Register Interest</p>
                    <div className={styles.iconFill} id={styles.emailIcon}>
                        <MdContactPage
                            className={styles.icon}
                            style={{ fontSize: '23px', bottom: '2px' }}
                        />
                    </div>
                </button>

            </Link>
            <Link href="/pay">
                <button>
                    <p>Pay & Enrol</p>
                    <div className={styles.iconFill} id={styles.linkedIcon}>
                        <MdClass
                            className={styles.icon}
                            style={{ fontSize: '20px', bottom: '1px' }}
                        />
                    </div>
                </button>
            </Link>
        </div>
    )
}

export default RegisterModal