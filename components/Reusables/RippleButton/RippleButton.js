import React from 'react';
import styles from '../../../styles/Components/RippleButton.module.scss';
import Link from 'next/link';

function RippleButton({ text, type, height, onClick }) {
    return (
        <div
        // className={styles.rippleButtonContainer}
        // styles={{ height: 100 }}
        >
            <button className={type === "primary"
                ? `${styles.rippleButton} ${styles.rpPrimary}`
                : `${styles.rippleButton} ${styles.rpSecondary}`}
                onClick={() => onClick()}
            >
                {text}
            </button>

        </div >

    )
}

export default RippleButton