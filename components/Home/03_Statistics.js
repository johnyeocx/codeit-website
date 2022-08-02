import React from 'react';
import styles from '../../styles/Home/Statistics.module.scss';
// import ByteDance from '../../assets/Brands/ByteDance.png';
// import Binance from '../../assets/Brands/Binance.png';
// import DBS from '../../assets/Brands/DBS.png';
// import NUS from '../../assets/Brands/NUS.png';
// import Facebook from '../../assets/Brands/Facebook.png';
// import Shopee from '../../assets/Brands/Shopee.png';
// import NTU from '../../assets/Brands/NTU.png';
// import Brands from '../../assets/Brands/Brands.png';
import Brands from '../../public/images/Brands.png';
import Switchup from '../../assets/Brands/Switchup.png';
import Google from '../../assets/Brands/Google.png';
import Approved from '../../assets/Brands/Approved.png';
import Image from 'next/image';

function Statistics() {
    return (
        <div className={styles.expertiseContainer}>
            {/* <div className={styles.titleContainer}>
                <h1>
                    And we only offer the
                    <span> best...</span>
                </h1>
                <div />
            </div> */}

            <div className={styles.teachersContainer}>
                <h2>Teachers <span>from...</span></h2>
                <div className={styles.brandsContainer}>
                    <div className={styles.brandSlider}>
                        <Image
                            src={Brands}
                            className={styles.brandImage}
                        />
                    </div>
                </div>

            </div>

            <div className={styles.teachersContainer}>
                <h2>Ratings <span>above...</span></h2>
                <div className={styles.ratingsContainer}>
                    <div className={styles.rating}>
                        <div className={styles.ratingIconContainer}>
                            <Image objectFit="contain" src={Switchup} />
                        </div>
                        <h3 className={styles.ratingBrand}>Switchup</h3>
                        <h3>5/5 Stars</h3>
                    </div>
                    <div className={styles.rating}>
                        <div className={styles.ratingIconContainer}>
                            <Image objectFit="contain" src={Google} />
                        </div>
                        <h3 className={styles.ratingBrand}>Google</h3>
                        <h3>5/5 Stars</h3>
                    </div>
                </div>
            </div>

            <div className={`${styles.teachersContainer}`}>
                <h2
                    style={{
                        marginBottom: 20
                    }}
                >Approved <span>by...</span></h2>
                <div className={styles.bottomContainer}>
                    <div className={styles.approvedImageContainer}>
                        <Image objectFit='contain' src={Approved} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Statistics