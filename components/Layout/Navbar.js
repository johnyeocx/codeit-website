import React, { useEffect, useState, useContext } from 'react';
import styles from '../../styles/Layout/Navbar.module.scss';
import navButtonStyles from '../../styles/Components/NavButton.module.scss';

import CILogo from '../../assets/logo.svg';
import ContactIcon from '../../assets/ContactIcon.svg'
import { IoMenu } from 'react-icons/io5';
import { HiInformationCircle } from 'react-icons/hi';
import { AiFillHome } from 'react-icons/ai';
import { RiTeamFill } from 'react-icons/ri';
import { MdCastForEducation } from 'react-icons/md';
import RippleButton from '../Reusables/RippleButton/RippleButton'
import NavButton from './NavButton/NavButton';
import Link from 'next/link'
import AppContext from '../../AppContext';
import { useRouter } from 'next/router';
import ContactModal from './ContactModal/ContactModal';
import MobileContactModal from './ContactModal/MobileContactModal';
import { scrollToElement } from '../Home/01_Landing';


function Navbar() {
    const value = useContext(AppContext);
    let { isMobile, bgColor } = value.state;
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileContactModalOpen, setMobileContactModalOpen] = useState(false);
    const [contactModalClicked, setContactModalClicked] = useState(false);

    return (
        <>
            <div id={styles.navContainer}
                style={{ backgroundColor: bgColor }}
            >
                <div className={styles.navLeft}
                    style={isMobile ? {
                        width: '50%'
                    } : {
                        width: '17%'
                    }}>
                    <CILogo id={styles.logo} />
                </div>
                <div
                    className={styles.navRight}
                    style={isMobile ? {
                        width: '50%'
                    } : {
                        width: '83%'
                    }}
                >
                    {
                        isMobile ? (

                            <>
                                <button
                                    className={styles.menuButton}
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setMobileContactModalOpen(!mobileContactModalOpen)
                                    }
                                    }
                                >
                                    <ContactIcon id={styles.callIcon} />
                                    {/* <ContactModal /> */}
                                </button>
                                <button
                                    className={styles.menuButton}
                                    onClick={() => {
                                        setMenuOpen(!menuOpen)
                                        setMobileContactModalOpen(false)
                                    }}
                                >
                                    <IoMenu id={styles.menuIcon} />
                                </button>
                            </>


                        ) : (
                            <>
                                <NavButton text='Home'
                                    onClick={(e) => {
                                        router.push('/')
                                    }}
                                />
                                <NavButton text='About Us'
                                    onClick={(e) => {
                                        router.push('/about')
                                    }}
                                />
                                <NavButton text='Our Team'
                                    onClick={(e) => {
                                        router.push('/our-team')
                                    }}
                                />
                                <NavButton text='Courses'
                                    onClick={(e) => {
                                        scrollToElement("#home-courses-container")
                                    }}
                                />
                                <div
                                    className={`${navButtonStyles.navButtonContainer} ${styles.contactButtonContainer}`}
                                >
                                    <button
                                        onClick={() => console.log("Contact Us")}
                                        className={navButtonStyles.navButton}
                                        id={styles.contactButton}
                                    >
                                        Contact Us
                                    </button>
                                    <ContactModal />
                                </div>
                                <NavButton text='Register Now'
                                    onClick={(e) => {
                                        router.push('/register')
                                    }}
                                />
                            </>
                        )
                    }
                </div>
            </div>
            {
                isMobile &&

                <>
                    <MobileContactModal
                        modalOpen={mobileContactModalOpen}
                        setModalOpen={setMobileContactModalOpen}
                        contactModalClicked={contactModalClicked}
                        setContactModalClicked={setContactModalClicked}
                    />
                    <div
                        className={styles.menuContainer}
                        style={menuOpen ? {
                            right: '0px',
                            backgroundColor: bgColor
                        } : {
                            right: '200vw',
                            backgroundColor: bgColor
                        }}
                    >
                        <Link href="/">
                            <div className={styles.menuItem}>
                                <AiFillHome style={{
                                    fontSize: '30px',
                                    marginRight: '20px',
                                    marginBottom: '2px'
                                }}
                                    color="#7C81F7"
                                />
                                <a onClick={() => setMenuOpen(false)}>Home</a>
                            </div>
                        </Link>

                        <Link href="/about">
                            <div className={styles.menuItem}>
                                <HiInformationCircle style={{
                                    fontSize: '30px',
                                    marginRight: '20px',
                                    marginBottom: '2px'
                                }}
                                    color="#7C81F7"
                                />
                                <a onClick={() => setMenuOpen(false)}>About Us</a>
                            </div>
                        </Link>

                        <Link href="/team">
                            <div className={styles.menuItem}>
                                <RiTeamFill style={{
                                    fontSize: '30px',
                                    marginRight: '20px',
                                    marginBottom: '2px'
                                }}
                                    color="#7C81F7"
                                />
                                <a onClick={() => setMenuOpen(false)}>Our Team</a>
                            </div>
                        </Link>

                        <Link href="/courses">
                            <div className={styles.menuItem}>
                                <MdCastForEducation style={{
                                    fontSize: '30px',
                                    marginRight: '20px',
                                    marginBottom: '2px'
                                }}
                                    color="#7C81F7"
                                />
                                <a onClick={() => setMenuOpen(false)}>Courses</a>
                            </div>
                        </Link>

                        <div className={styles.registerBtnContainer}>
                            <RippleButton
                                text="Register Now"
                                type="primary"
                                onClick={() => {
                                    router.push('/register')
                                    setMenuOpen(false);
                                }}
                            />
                        </div>

                    </div>
                </>

            }

        </>

    )
}

export default Navbar