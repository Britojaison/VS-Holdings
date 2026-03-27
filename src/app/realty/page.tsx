import styles from "./page.module.css";
import Link from "next/link";
import Slider from "@/components/Slider";
import InterestSection from "@/components/InterestSection";

export default function RealtyPage() {
    return (
        <div className={styles.main}>
            <section className={styles.hero}>
                <header className={styles.header}>
                    <div className={styles.leftNav}>
                        <Link href="/realty" className={styles.logo}>
                            <img src="/images/logo.png" alt="VS Holdings" className={styles.logoImage} />
                        </Link>
                    </div>

                    <div className={styles.rightNav}>
                        <button className={styles.menuButton} aria-label="Menu">
                            <div className={styles.hamburger}>
                                <span className={styles.hamburgerLine}></span>
                                <span className={styles.hamburgerLine}></span>
                                <span className={styles.hamburgerLine}></span>
                            </div>
                        </button>
                    </div>
                </header>
                <video
                    className={styles.heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/images/video.mp4" type="video/mp4" />
                </video>
            </section>
            <div id="slider">
                <Slider />
            </div>
            <InterestSection />
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} VS Holdings. All Rights Reserved. Privileged & Confidential.
                </p>
            </footer>
        </div>
    );
}
