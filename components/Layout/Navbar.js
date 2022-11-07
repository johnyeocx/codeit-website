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
import Popup from './Popup/Popup';
import Div100vh from 'react-div-100vh';
import RegisterModal from './RegisterModal/RegisterModal';


function Navbar() {
    const value = useContext(AppContext);
    let { isMobile, bgColor } = value.state;
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileContactModalOpen, setMobileContactModalOpen] = useState(false);
    const [contactModalClicked, setContactModalClicked] = useState(false);
    const [popupOpen, setPopupOpen] = useState(true);

    return (
        <>
            {/* <Popup
                popupOpen={popupOpen}
                setPopupOpen={setPopupOpen}
                bgColor={bgColor}
            /> */}

            <div id={styles.navContainer}
                style={mobileContactModalOpen ?
                    { backgroundColor: bgColor } :
                    { backgroundColor: bgColor }
                }
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
                                    isLink
                                    href="/"
                                    onClick={() => {
                                        if (router.pathname == '/') scrollToElement("#home-landing")
                                    }}
                                />
                                <NavButton text='Our Team'
                                    isLink
                                    href="/our-team"
                                />
                                <NavButton text='Courses'
                                    isLink
                                    href="/?section=courses"
                                    onClick={(e) => {
                                        if (router.pathname == "/") {
                                            scrollToElement("#home-courses-container")
                                        }
                                    }}
                                />
                                <div
                                    className={`${navButtonStyles.navButtonContainer} ${styles.contactButtonContainer}`}
                                >
                                    <button
                                        className={navButtonStyles.navButton}
                                        id={styles.contactButton}
                                    >
                                        Contact Us
                                    </button>
                                    <ContactModal />
                                </div>

                                <div
                                    className={`${navButtonStyles.navButtonContainer} ${styles.registerBtnContainer}`}
                                >
                                    <button
                                        className={navButtonStyles.navButton}
                                        id={styles.contactButton}
                                    >
                                        Register
                                    </button>
                                    <RegisterModal />
                                </div>
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
                    <Div100vh
                        className={styles.menuContainerWrapper}
                        style={menuOpen ? {
                            right: '0px',
                            backgroundColor: bgColor,
                        } : {
                            right: '200vw',
                            backgroundColor: bgColor,
                        }}
                    >
                        <div className={styles.menuContainer}>
                            <Link href="/">
                                <div className={styles.menuItem}>
                                    <AiFillHome style={{
                                        fontSize: '30px',
                                        marginRight: '20px',
                                        marginBottom: '2px'
                                    }}
                                        color="#7C81F7"
                                    />
                                    <a onClick={() => {
                                        if (router.pathname == '/') scrollToElement("#home-landing")
                                        setMenuOpen(false)
                                    }}>Home</a>
                                </div>
                            </Link>
                            <Link href="/our-team">
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

                            <Link href="/?section=courses">
                                <div className={styles.menuItem}>
                                    <MdCastForEducation style={{
                                        fontSize: '30px',
                                        marginRight: '20px',
                                        marginBottom: '2px'
                                    }}
                                        color="#7C81F7"
                                    />
                                    <a onClick={() => {
                                        if (router.pathname == "/") {
                                            scrollToElement("#home-courses-container")
                                        } else {
                                            router.push('/?section=courses')
                                        }
                                        setMenuOpen(false)
                                    }}>Courses</a>
                                </div>
                            </Link>

                            <div className={styles.registerBtnContainerMobile}>
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
                    </Div100vh>

                </>

            }

        </>

    )
}

export default Navbar