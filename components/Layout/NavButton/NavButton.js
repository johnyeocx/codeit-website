import React from 'react'
import styles from '../../../styles/Components/NavButton.module.scss'

import Link from 'next/link'

function NavButton({ text, onClick, style, children }) {
    return (
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

export default NavButton