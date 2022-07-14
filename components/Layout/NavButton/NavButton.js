import React from 'react'
import styles from '../../../styles/Components/NavButton.module.scss'
import Link from 'next/link'

function NavButton({ isLink, href, text, onClick, style, children }) {
    return (
        <>
            {isLink ?
                (
                    <div
                        className={styles.navButtonContainer}
                        style={style}
                    >
                        <Link href={href}>
                            <a onClick={onClick ? () => onClick() : null} className={styles.navButton}>
                                {text}
                            </a>
                        </Link>
                    </div>
                ) : (
                    <div
                        className={styles.navButtonContainer}
                        style={style}
                    >
                        <button onClick={onClick} className={styles.navButton}>
                            {text}
                        </button>
                    </div>
                )
            }
        </>

    )
}

export default NavButton