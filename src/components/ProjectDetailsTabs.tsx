"use client";

import { useState } from 'react';
import styles from './ProjectDetailsTabs.module.css';

const TABS = ['LOCATION', 'GALLERY', 'FLOOR PLANS', 'BROCHURE'];
const FLOOR_PLANS = ['STUDIO', '1 BEDROOM', '2 BEDROOM'];

const galleryImages = [
    { src: '/images/beedroom.jpg', caption: 'BEDROOM' },
    { src: '/images/living.jpg', caption: 'LIVING ROOM' },
    { src: '/images/1.jpg', caption: 'EXTERIOR' },
];

const floorPlanImages: Record<string, string> = {
    'STUDIO': '/images/studio.jpg',
    '1 BEDROOM': '/images/1bedroom.jpg',
    '2 BEDROOM': '/images/2bedroom.jpg',
};

const ProjectDetailsTabs = () => {
    const [activeTab, setActiveTab] = useState('LOCATION');
    const [activeFloorPlan, setActiveFloorPlan] = useState('STUDIO');
    const [galleryIndex, setGalleryIndex] = useState(0);

    const handleNextGallery = () => setGalleryIndex((p) => (p + 1) % galleryImages.length);
    const handlePrevGallery = () => setGalleryIndex((p) => (p - 1 + galleryImages.length) % galleryImages.length);

    return (
        <section className={styles.section}>
            <nav className={styles.tabNav}>
                {TABS.map((tab, idx) => (
                    <div key={tab} className={styles.tabItem}>
                        <button
                            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                        {idx < TABS.length - 1 && <span className={styles.tabDivider}>|</span>}
                    </div>
                ))}
            </nav>

            <div className={styles.contentContainer}>
                {activeTab === 'LOCATION' && (
                    <div className={styles.locationContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786539269224!2d55.2742884!3d25.197196999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1709214713!5m2!1sen!2sae"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className={styles.mapIframe}
                            title="Location Map"
                        ></iframe>
                    </div>
                )}

                {activeTab === 'GALLERY' && (
                    <div className={styles.galleryContainer}>
                        <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={handlePrevGallery}>
                            <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className={styles.galleryImageWrapper}>
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`${styles.gallerySlide} ${idx === galleryIndex ? styles.activeSlide : ''}`}
                                    style={{ backgroundImage: `url(${img.src})` }}
                                />
                            ))}
                        </div>

                        <div key={galleryIndex} className={styles.caption}>
                            {galleryImages[galleryIndex].caption}
                        </div>

                        <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={handleNextGallery}>
                            <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                )}

                {activeTab === 'FLOOR PLANS' && (
                    <div className={styles.floorPlansContainer}>
                        <div className={styles.subTabsContainer}>
                            <div className={styles.subTabs}>
                                {FLOOR_PLANS.map(plan => (
                                    <button
                                        key={plan}
                                        className={`${styles.subTabBtn} ${activeFloorPlan === plan ? styles.activeSubTab : ''}`}
                                        onClick={() => setActiveFloorPlan(plan)}
                                    >
                                        {plan}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.floorPlanImageContainer}>
                            <div className={styles.floorPlanTitle}>UNIT TYPE: {activeFloorPlan}</div>
                            <img src={floorPlanImages[activeFloorPlan]} alt={`${activeFloorPlan} Floor Plan`} className={styles.floorPlanImage} />
                        </div>
                    </div>
                )}

                {activeTab === 'BROCHURE' && (
                    <div className={styles.brochureContainer} style={{ backgroundImage: "url('/images/d.jpg')" }}>
                        <div className={styles.brochureOverlay}>
                            <div className={styles.brochureContent}>
                                <h3 className={styles.brochureHeading}>DOWNLOAD THE BROCHURE</h3>
                                <p className={styles.brochureText}>Explore detailed specifications, floor plans, and amenities.</p>
                                <button className={styles.downloadBtn}>
                                    DOWNLOAD PDF
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectDetailsTabs;
