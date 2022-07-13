import React, { useEffect, useContext } from 'react';
import AppContext from '../../AppContext';
import styles from '../../styles/Team/Team.module.scss';


function About() {
    const value = useContext(AppContext);
    let { isMobile, dimensions } = value.state;
    let { bgColor } = value.state;
    let { setBgColor } = value;

    useEffect(() => {
        setBgColor("#FFFDFD")
    }, [])

    return (
        <div className={styles.container}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
            }}
        >
            <h1>
                Coming Soon...
            </h1>

        </div>
    )
}

export default About