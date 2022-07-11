import React from 'react'
import styles from '../../../styles/Home/USP.module.scss'

function USPCard({
    Icon,
    iconWidth,
    title,
    description,
    onClick
}) {
    return (
        <div className={styles.USPCard}>
            <div className={styles.cardTop}>
                <Icon width={iconWidth} className={styles.USPIcon} />
                <h3>{title}</h3>
            </div>

            <div className={styles.cardMiddle}>
                <p>
                    {description}
                </p>
            </div>

            <div className={styles.cardBottom}>
                <button
                    onClick={onClick}
                >Learn More</button>
            </div>

        </div>
    )
}

export default USPCard