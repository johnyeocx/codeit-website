import React from 'react';
import styles from '../../../styles/Home/Reviews.module.scss';
import Image from 'next/image';

function ReviewCard({ review }) {
    let color = review.course == "Intro" ? "#FEDAD2" :
        (review.course == "Essentials" ? "#E6F4FE"
            : "#EBE6FF")

    return (
        <div className="review-card" style={{
            backgroundColor: color
        }}>
            <div className={styles.cardUpper}>
                <div className={styles.left}>
                    <div className={styles.imgContainer}>
                        <Image objectFit='cover' className={styles.reviewImage} src={review.image} />
                    </div>
                </div>
                <div className={styles.right}>
                    <h4>{review.name}</h4>
                    <p>{`${review.course} Graduate`}</p>
                    <p>{`Class of ${review.class}`}</p>
                </div>
            </div>
            <div className={styles.cardMiddle}>
                <p>{review.review}</p>
            </div>
        </div>
    )
}

export default ReviewCard