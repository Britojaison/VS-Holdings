"use client";

import styles from "./InterestSection.module.css";
import { useState, useEffect, useRef } from "react";

const countries = [
    { n: "Afghanistan", c: "+93" }, { n: "Albania", c: "+355" }, { n: "Algeria", c: "+213" },
    { n: "American Samoa", c: "+1684" }, { n: "Andorra", c: "+376" }, { n: "Angola", c: "+244" },
    { n: "Anguilla", c: "+1264" }, { n: "Antigua and Barbuda", c: "+1268" }, { n: "Argentina", c: "+54" },
    { n: "Armenia", c: "+374" }, { n: "Aruba", c: "+297" }, { n: "Australia", c: "+61" },
    { n: "Austria", c: "+43" }, { n: "Azerbaijan", c: "+994" }, { n: "Bahamas", c: "+1242" },
    { n: "Bahrain", c: "+973" }, { n: "Bangladesh", c: "+880" }, { n: "Barbados", c: "+1246" },
    { n: "Belarus", c: "+375" }, { n: "Belgium", c: "+32" }, { n: "Belize", c: "+501" },
    { n: "Benin", c: "+229" }, { n: "Bermuda", c: "+1441" }, { n: "Bhutan", c: "+975" },
    { n: "Bolivia", c: "+591" }, { n: "Bosnia and Herzegovina", c: "+387" }, { n: "Botswana", c: "+267" },
    { n: "Brazil", c: "+55" }, { n: "Brunei", c: "+673" }, { n: "Bulgaria", c: "+359" },
    { n: "Burkina Faso", c: "+226" }, { n: "Burundi", c: "+257" }, { n: "Cabo Verde", c: "+238" },
    { n: "Cambodia", c: "+855" }, { n: "Cameroon", c: "+237" }, { n: "Canada", c: "+1" },
    { n: "Cayman Islands", c: "+1345" }, { n: "Central African Republic", c: "+236" }, { n: "Chad", c: "+235" },
    { n: "Chile", c: "+56" }, { n: "China", c: "+86" }, { n: "Colombia", c: "+57" },
    { n: "Comoros", c: "+269" }, { n: "Congo", c: "+242" }, { n: "Costa Rica", c: "+506" },
    { n: "Croatia", c: "+385" }, { n: "Cuba", c: "+53" }, { n: "Cyprus", c: "+357" },
    { n: "Czech Republic", c: "+420" }, { n: "Denmark", c: "+45" }, { n: "Djibouti", c: "+253" },
    { n: "Dominica", c: "+1767" }, { n: "Dominican Republic", c: "+1" }, { n: "Ecuador", c: "+593" },
    { n: "Egypt", c: "+20" }, { n: "El Salvador", c: "+503" }, { n: "Estonia", c: "+372" },
    { n: "Ethiopia", c: "+251" }, { n: "Fiji", c: "+679" }, { n: "Finland", c: "+358" },
    { n: "France", c: "+33" }, { n: "Gabon", c: "+241" }, { n: "Gambia", c: "+220" },
    { n: "Georgia", c: "+995" }, { n: "Germany", c: "+49" }, { n: "Ghana", c: "+233" },
    { n: "Greece", c: "+30" }, { n: "Grenada", c: "+1473" }, { n: "Guatemala", c: "+502" },
    { n: "Guinea", c: "+224" }, { n: "Haiti", c: "+509" }, { n: "Honduras", c: "+504" },
    { n: "Hong Kong", c: "+852" }, { n: "Hungary", c: "+36" }, { n: "Iceland", c: "+354" },
    { n: "India", c: "+91" }, { n: "Indonesia", c: "+62" }, { n: "Iran", c: "+98" },
    { n: "Iraq", c: "+964" }, { n: "Ireland", c: "+353" }, { n: "Israel", c: "+972" },
    { n: "Italy", c: "+39" }, { n: "Jamaica", c: "+1876" }, { n: "Japan", c: "+81" },
    { n: "Jordan", c: "+962" }, { n: "Kazakhstan", c: "+7" }, { n: "Kenya", c: "+254" },
    { n: "Kuwait", c: "+965" }, { n: "Lebanon", c: "+961" }, { n: "Libya", c: "+218" },
    { n: "Luxembourg", c: "+352" }, { n: "Malaysia", c: "+60" }, { n: "Maldives", c: "+960" },
    { n: "Malta", c: "+356" }, { n: "Mexico", c: "+52" }, { n: "Monaco", c: "+377" },
    { n: "Morocco", c: "+212" }, { n: "Netherlands", c: "+31" }, { n: "New Zealand", c: "+64" },
    { n: "Nigeria", c: "+234" }, { n: "Norway", c: "+47" }, { n: "Oman", c: "+968" },
    { n: "Pakistan", c: "+92" }, { n: "Philippines", c: "+63" }, { n: "Poland", c: "+48" },
    { n: "Portugal", c: "+351" }, { n: "Qatar", c: "+974" }, { n: "Romania", c: "+40" },
    { n: "Russia", c: "+7" }, { n: "Saudi Arabia", c: "+966" }, { n: "Singapore", c: "+65" },
    { n: "South Africa", c: "+27" }, { n: "South Korea", c: "+82" }, { n: "Spain", c: "+34" },
    { n: "Sri Lanka", c: "+94" }, { n: "Sweden", c: "+46" }, { n: "Switzerland", c: "+41" },
    { n: "Thailand", c: "+66" }, { n: "Turkey", c: "+90" }, { n: "Ukraine", c: "+380" },
    { n: "United Arab Emirates", c: "+971" }, { n: "United Kingdom", c: "+44" }, { n: "United States", c: "+1" },
    { n: "Uruguay", c: "+598" }, { n: "Uzbekistan", c: "+998" }, { n: "Vanuatu", c: "+678" },
    { n: "Vatican City", c: "+379" }, { n: "Venezuela", c: "+58" }, { n: "Vietnam", c: "+84" },
    { n: "Wallis and Futuna", c: "+681" }, { n: "Yemen", c: "+967" }, { n: "Zambia", c: "+260" }, { n: "Zimbabwe", c: "+263" }
];

const InterestSection = () => {
    const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.c === "+91"));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`${styles.container} ${isVisible ? styles.visible : ""}`}
        >
            <div className={styles.leftSide}>
                <div className={styles.heading}>
                    <h2>EXPRESS <span>YOUR INTEREST</span></h2>
                </div>

                <div className={styles.links}>
                    <div className={styles.tagline}>
                        <h3>CURATING EXCELLENCE IN MODERN REAL ESTATE</h3>
                        <p>VS Holdings is a premier global real estate group dedicated to redefining luxury and performance across the world's most iconic skylines.</p>
                    </div>
                </div>

                <div className={styles.socials}>
                    <a href="#" className={styles.socialIcon} aria-label="Instagram">
                        <img src="/images/instagram.svg" alt="Instagram" className={styles.socialImg} />
                    </a>
                    <a href="#" className={styles.socialIcon} aria-label="YouTube">
                        <img src="/images/youtube.svg" alt="YouTube" className={styles.socialImg} />
                    </a>
                </div>
            </div>

            <div className={styles.rightSide}>
                <div className={styles.formWrapper}>
                    <div className={styles.inputGroup}>
                        <label>NAME</label>
                        <input type="text" placeholder="Your Full Name" />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.phoneGroup}`}>
                        <div className={styles.countryCode} ref={dropdownRef}>
                            <label>COUNTRY CODE</label>
                            <div className={styles.selectWrapper} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <div className={styles.selectedDisplay}>{selectedCountry?.n} ({selectedCountry?.c})</div>
                                <svg className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M1 1l4 4 4-4" />
                                </svg>
                                {isDropdownOpen && (
                                    <div className={styles.optionsList}>
                                        {countries.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={styles.optionItem}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCountry(item);
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                {item.n} ({item.c})
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>MOBILE</label>
                            <input type="text" placeholder="5X XXX XXXX" />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>EMAIL</label>
                        <input type="email" placeholder="email@address.com" />
                    </div>

                    <p style={{ fontSize: '0.6rem', opacity: '0.6', letterSpacing: '0.05rem', margin: '2rem 0' }}>
                        By submitting, you agree to our <a href="#" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>terms & conditions*</a>
                    </p>

                    <button className={styles.ambassadorButton}>
                        SUBMIT
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InterestSection;
