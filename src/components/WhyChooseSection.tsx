'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhyChooseSection.module.css';

interface WhyChooseProps {
    projectName: string;
}

const features = [
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2L25 14L38 16L28 26L30 38L20 32L10 38L12 26L2 16L15 14L20 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
        ),
        title: 'Premium Amenities',
        description: 'Over 15+ world-class amenities including private pools on every level, redefining contemporary urban luxury.',
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4V36M4 20H36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 10C12 14 16 16 20 16C24 16 28 14 32 10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 30C12 26 16 24 20 24C24 24 28 26 32 30" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        title: 'Strategic Location',
        description: 'Excellent connectivity to major road networks, business centres, leisure hubs, and the International Airport.',
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 16H36" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 4V12M26 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 22H18V28H12V22Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        title: 'Resort-Inspired Living',
        description: 'Emerging as the latest resort-inspired destination, designed for those who appreciate elevated living.',
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 36V18L20 4L30 18V36" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M4 36H36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 36V26H24V36" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M15 22H18M22 22H25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
        title: 'Iconic Development',
        description: 'A new iconic development taking shape in the heart of the city with strong, future-focused returns.',
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 34C10 28 14 20 20 14C24 10 30 8 34 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="34" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 34L6 24M6 34H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14 28C16 24 19 20 22 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 3"/>
            </svg>
        ),
        title: 'Future-Focused Returns',
        description: 'Pursuing strong, future-focused returns with thoughtfully designed spaces in a greener, peaceful environment.',
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6C14 6 8 10 8 18C8 28 20 36 20 36C20 36 32 28 32 18C32 10 26 6 20 6Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 18L18 22L26 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
        title: 'Serene Environment',
        description: 'Refined lifestyle within a greener, more peaceful, and less congested environment away from the urban rush.',
    },
];

const stats = [
    { value: 15, suffix: '+', label: 'Premium Amenities' },
    { value: 100, suffix: '%', label: 'Vastu Compliant' },
    { value: 24, suffix: '/7', label: 'Security' },
    { value: 5, suffix: ' min', label: 'To Highway' },
];

// Animated counter component
function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, target]);

    return (
        <span className={styles.statValue}>
            {count}{suffix}
        </span>
    );
}

const WhyChooseSection = ({ projectName }: WhyChooseProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        features.forEach((_, index) => {
            const timer = setTimeout(() => {
                setVisibleCards(prev => new Set([...prev, index]));
            }, 150 * index);
            return () => clearTimeout(timer);
        });
    }, [isVisible]);

    return (
        <section id="why-choose-section" className={styles.section} ref={sectionRef}>
            {/* Decorative background elements */}
            <div className={styles.bgPattern} />
            <div className={styles.bgGlow} />

            <div className={styles.container}>
                {/* Header area */}
                <div className={`${styles.headerArea} ${isVisible ? styles.revealed : ''}`}>
                    <span className={styles.eyebrow}>DISCOVER THE DIFFERENCE</span>
                    <h2 className={styles.title}>
                        WHY CHOOSE <span className={styles.projectName}>{projectName.toUpperCase()}?</span>
                    </h2>
                    <p className={styles.subtitle}>
                        A new iconic development taking shape in the heart of the city, designed for those who appreciate elevated living.
                    </p>
                </div>

                {/* Stats bar */}
                <div className={`${styles.statsBar} ${isVisible ? styles.revealed : ''}`}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Feature cards grid */}
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${styles.featureCard} ${visibleCards.has(index) ? styles.cardRevealed : ''}`}
                        >
                            <div className={styles.cardGlow} />
                            <div className={styles.iconWrapper}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                            <div className={styles.cardLine} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
