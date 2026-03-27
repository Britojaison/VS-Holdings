import styles from "./page.module.css";
import Link from "next/link";

export default function LandingPage() {
    return (
        <main className={styles.container}>
            <video
                className={styles.videoBackground}
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/images/landing.mp4" type="video/mp4" />
            </video>

            <div className={styles.overlay}></div>

            <div className={styles.cardsContainer}>
                {/* Government Project Card - Disabled */}
                <div className={`${styles.card} ${styles.cardDisabled}`}>
                    <h2 className={styles.cardTitle}>Government Projects</h2>
                    <span className={styles.cardSubtitle}>(Coming Soon)</span>
                </div>

                {/* Realty Projects Card - Active */}
                <Link href="/realty" className={styles.card}>
                    <h2 className={styles.cardTitle}>Realty Projects</h2>
                    <span className={styles.cardSubtitle}>Enter site &rarr;</span>
                </Link>
            </div>
        </main>
    );
}
