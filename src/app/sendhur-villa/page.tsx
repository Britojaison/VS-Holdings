"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Collection.module.css";
import WhyChooseSection from "@/components/WhyChooseSection";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectDetailsTabs from "@/components/ProjectDetailsTabs";
import FAQSection from "@/components/FAQSection";

const CollectionPage = () => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [isUiVisible, setIsUiVisible] = useState(false);

    useEffect(() => {
        // Start zoom effect immediately
        const zoomTimer = setTimeout(() => setIsZoomed(true), 100);

        // Show UI after zoom effect starts
        const uiTimer = setTimeout(() => setIsUiVisible(true), 400);

        return () => {
            clearTimeout(zoomTimer);
            clearTimeout(uiTimer);
        };
    }, []);

    return (
        <>
            <main className={styles.main}>
                {/* Background with zoom effect */}
                <div className={`${styles.background} ${isZoomed ? styles.visible : ""}`} />

                {/* Top Navigation / Brand - Visible after zoom */}
                <header className={`${styles.header} ${isUiVisible ? styles.visibleUI : ""}`}>
                    <Link href="/realty" className={styles.backButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className={styles.brandTitle}>
                        VS HOLDINGS <span className={styles.divider}>/</span> <span>SENDHUR VILLA</span>
                    </h1>
                </header>

                {/* Interactive Bottom Group - Closely tucked together */}
                <div className={`${styles.bottomContainer} ${isUiVisible ? styles.visibleUI : ""}`}>
                    <div className={styles.centerContent}>
                        <button className={styles.registerButton}>
                            REGISTER YOUR INTEREST
                        </button>
                    </div>

                    <footer className={styles.bottomBar}>
                        <div className={styles.infoBlock}>
                            <span className={styles.value}>AVAILABLE</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.value}>NAMAKKAL</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.value}>STUDIO | 1 BR | 2 BR</span>
                        </div>
                    </footer>
                </div>
            </main>
            <WhyChooseSection projectName="Sendhur Villa" />
            <ProjectCarousel />
            <ProjectDetailsTabs />
            <FAQSection projectName="Sendhur Villa" />
            <footer className={styles.pageFooter}>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} VS Holdings. All Rights Reserved. Privileged & Confidential.
                </p>
            </footer>
        </>
    );
};

export default CollectionPage;
