import React from 'react'
import styles from '../../styles/Home/USP.module.scss';
import USPCard from './USPCard/USPCard';

import CheapSVG from '../../assets/Home/USP/cheap.svg';
import EasySVG from '../../assets/Home/USP/easy.svg';
import ExpertiseSVG from '../../assets/Home/USP/expertise.svg';
import { useRouter } from 'next/router';
import { scrollToElement } from './01_Landing';

function USP() {
    const router = useRouter();
    const USPs = [
        {
            title: "Affordable",
            icon: CheapSVG,
            iconWidth: 25,
            description: "Our courses are not only cheap, but eligible for subsidies. Best part? It can be FREE!",
            onClick: () => router.push('/subsidies')
        },
        {
            title: "Short & Sweet",
            icon: EasySVG,
            iconWidth: 25,
            description: "Join our quick & hassle-free courses to get where you need to be in the blink of an eye.",
            onClick: () => scrollToElement('#home-courses-container')
        },
        {
            title: "Holistic",
            icon: ExpertiseSVG,
            iconWidth: 30,
            description: "Use the knowledge learnt in class to tackle real life problems and take your competency to the next level!",
            onClick: () => scrollToElement('#home-courses-container')
        }
    ]

    return (
        <div id="USP-container" className={styles.USPContainer}>

            <div className={styles.titleContainer}>
                <h1>
                    Choose <span>codeit</span> and don't
                    <span> look back</span>
                </h1>
                <div></div>
            </div>

            <div className={styles.mainContainer}>
                {USPs.map((usp, index) => {
                    return (
                        <USPCard
                            key={index}
                            Icon={usp.icon}
                            iconWidth={usp.iconWidth}
                            title={usp.title}
                            description={usp.description}
                            onClick={usp.onClick}
                        />
                    )
                })}
            </div>


        </div>
    )
}

export default USP