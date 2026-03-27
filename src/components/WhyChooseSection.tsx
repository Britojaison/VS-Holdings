import styles from './WhyChooseSection.module.css';

interface WhyChooseProps {
    projectName: string;
}

const WhyChooseSection = ({ projectName }: WhyChooseProps) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    WHY CHOOSE <span className={styles.projectName}>{projectName.toUpperCase()}?</span>
                </h2>

                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        A new <strong>iconic development is taking shape in the heart of the city.</strong> {projectName} is designed for those who appreciate elevated living while pursuing strong, future-focused returns. Emerging as the latest resort-inspired destination, the project features over <strong>15+ premium</strong> amenities and private pools on every level, redefining contemporary urban luxury.
                    </p>
                    <p className={styles.paragraph}>
                        {projectName} has excellent connectivity to major road networks, ensuring smooth access to business centres, leisure hubs, and the International Airport. Thoughtfully designed, refined lifestyle within a greener, more peaceful, and less congested environment away from the urban rush.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
