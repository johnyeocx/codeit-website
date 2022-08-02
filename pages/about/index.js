import React, { useEffect, useContext } from 'react';
import Div100vh from 'react-div-100vh';
import AppContext from '../../AppContext';
import styles from '../../styles/About/About.module.scss';


function About() {
    const value = useContext(AppContext);
    let { isMobile, dimensions } = value.state;
    let { bgColor } = value.state;
    let { setBgColor } = value;

    useEffect(() => {
        setBgColor("#FFFDFD")
    }, [])

    return (
        <Div100vh style={{
            backgroundColor: bgColor,
            zIndex: '-100',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center', alignItems: 'center'
        }}
            className={styles.container}
        >
            <h1>
                Coming Soon...
            </h1>
        </Div100vh >
    )
}

export default About