"use client";

import { useState } from 'react';
import styles from './ProjectCarousel.module.css';

const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/6.jpg',
];

const ProjectCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>CAROUSEL IMAGES</h2>
            <div className={styles.carouselWrapper}>
                <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={handlePrev} aria-label="Previous image">
                    <svg className={styles.arrowIcon} viewBox="0 0 24 24">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className={styles.imageContainer}>
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className={`${styles.imageWrapper} ${index === currentIndex ? styles.active : ''}`}
                            style={{ backgroundImage: `url(${src})` }}
                        />
                    ))}
                </div>

                <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={handleNext} aria-label="Next image">
                    <svg className={styles.arrowIcon} viewBox="0 0 24 24">
                        <path d="M9 5l6 6-6 6" />
                    </svg>
                </button>
            </div>

            <div className={styles.buttonWrapper}>
                <button className={styles.registerButton}>
                    REGISTER YOUR INTEREST
                </button>
            </div>
        </section>
    );
};

export default ProjectCarousel;
