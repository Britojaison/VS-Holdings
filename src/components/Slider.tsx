"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.css";

const IMAGES = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg"
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sliderRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (sliderRef.current) {
            observer.observe(sliderRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + IMAGES.length) % IMAGES.length);
    };

    return (
        <section
            ref={sliderRef}
            className={`${styles.sliderContainer} ${isVisible ? styles.visible : ""}`}
        >
            {IMAGES.map((image, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}

            <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={handlePrev}>
                <svg className={styles.arrowIcon} viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={handleNext}>
                <svg className={styles.arrowIcon} viewBox="0 0 24 24">
                    <path d="M9 5l6 6-6 6" />
                </svg>
            </button>

            <div key={`${currentIndex}-${isVisible}`} className={styles.discoverButtonContainer}>
                <button className={styles.discoverButton}>
                    DISCOVER THE COLLECTION
                </button>
            </div>
        </section>
    );
};

export default Slider;
