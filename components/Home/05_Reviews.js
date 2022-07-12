import React from 'react'
import styles from '../../styles/Home/Reviews.module.scss';
import RippleButton from '../Reusables/RippleButton/RippleButton';


var $ = require("jquery");
if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import dynamic from "next/dynamic";
import { courseReviews } from './Reviews/reviews';
import ReviewCard from './ReviewCard/ReviewCard';
import { useRouter } from 'next/router';

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

function Reviews() {
    const router = useRouter();

    return (
        <div className={styles.reviewsContainer}>
            <div className={styles.titleContainer}>
                <h1>Hear from<span> our alumni</span></h1>
                <div />
            </div>

            <section className="testimonial">
                <div className={styles.carouselContainer}>
                    <OwlCarousel
                        id="reviews-carousel"
                        loop
                        center
                        items={3}
                        margin={0}
                        // autoplay={true}
                        autoplayTimeout={8500}
                        smartSpeed={450}
                        responsive={{
                            0: {
                                items: 1
                            },
                            768: {
                                items: 2
                            },
                            1170: {
                                items: 3
                            }
                        }}
                        nav={false}
                    >
                        {
                            courseReviews.map((review, index) =>
                                <ReviewCard key={index} review={review} />
                            )
                        }
                    </OwlCarousel>
                </div>
            </section>

            {/* <div className={styles.containerBottom}>
                <div className={styles.rippleButtonContainer}>
                    <RippleButton
                        text="See All"
                        id={styles.reviewsButton}
                        onClick={() => router.push('our-team')}
                    />
                </div>
            </div> */}
        </div>
    )
}

export default Reviews