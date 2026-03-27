"use client";

import { useState } from 'react';
import styles from './FAQSection.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQSection = ({ projectName }: { projectName: string }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs: FAQItem[] = [
        {
            question: `What is the exact location of ${projectName}?`,
            answer: `${projectName} is strategically located, providing excellent connectivity to major road networks and business hubs, all while offering a serene and premium private environment.`
        },
        {
            question: `What are the available unit configurations in ${projectName}?`,
            answer: `We meticulously designed a curated selection of premium residences, including spacious Studios, 1 Bedroom, and 2 Bedroom luxury apartments tailored to your modern lifestyle.`
        },
        {
            question: `What world-class amenities are included for residents?`,
            answer: `Residents of ${projectName} enjoy exclusive access to resort-style amenities including infinity swimming pools, fully equipped fitness centers, relaxing cabanas, and highly secure 24/7 concierge services.`
        },
        {
            question: `When is the expected handover timeline for ${projectName}?`,
            answer: `Please register your interest above and download our formal brochure, or contact our dedicated sales team directly for the most up-to-date and accurate handover schedules.`
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Frequently Asked questions</h2>
                <div className={styles.accordion}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={`${styles.accordionItem} ${openIndex === index ? styles.open : ''}`}>
                            <button
                                className={styles.accordionHeader}
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className={styles.question}>{faq.question}</span>
                                <span className={styles.iconWrapper}>
                                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        {openIndex === index ? (
                                            <path d="M5 12h14" />
                                        ) : (
                                            <path d="M12 5v14M5 12h14" />
                                        )}
                                    </svg>
                                </span>
                            </button>
                            <div className={styles.accordionContent}>
                                <div className={styles.accordionInner}>
                                    <div className={styles.answerText}>
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
