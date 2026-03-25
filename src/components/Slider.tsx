"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Slider.module.css";

const IMAGES = [
    { url: "/images/a.jpg", title: "VS HOLDINGS | SENDHUR VILLA" },
    { url: "/images/b.jpg", title: "VS HOLDINGS | MEIRA BLOOM" },
    { url: "/images/1.jpg", title: "VS HOLDINGS | SENDHUR VILLA" },
    { url: "/images/2.jpg" },
    { url: "/images/3.jpg" },
    { url: "/images/4.jpg" },
    { url: "/images/5.jpg" }
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
                    style={{ backgroundImage: `url(${image.url})` }}
                >
                    {image.title && index === currentIndex && (
                        <div className={styles.slideTitleContainer}>
                            <h2 className={styles.slideTitle}>
                                {image.title.split('|')[0]}
                                <span className={styles.divider}>/</span>
                                <span className={styles.accent}>{image.title.split('|')[1]}</span>
                            </h2>
                        </div>
                    )}
                </div>
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
                {[0, 2].includes(currentIndex) ? (
                    <Link href="/sendhur-villa">
                        <button className={styles.discoverButton}>
                            DISCOVER THE COLLECTION
                        </button>
                    </Link>
                ) : currentIndex === 1 ? (
                    <Link href="/meira-bloom">
                        <button className={styles.discoverButton}>
                            DISCOVER THE COLLECTION
                        </button>
                    </Link>
                ) : (
                    <button className={styles.discoverButton} style={{ cursor: 'default' }}>
                        DISCOVER THE COLLECTION
                    </button>
                )}
            </div>
        </section>
    );
};

export default Slider;
