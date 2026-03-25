"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./ContactOverlay.module.css";

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

const ContactOverlay = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.c === "+91"));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggle = () => setIsOpen(!isOpen);

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
        const triggerDrop = () => {
            const projectPages = ["/sendhur-villa", "/meira-bloom"];
            if (projectPages.includes(pathname) && !isOpen) {
                setIsOpen(true);
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 50) triggerDrop();
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0) triggerDrop();
        };

        const handleTouch = (e: TouchEvent) => {
            // Very simple touch move detection for "down"
            // For more precision we could track start/end Y, but a move is usually intent
            triggerDrop();
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("wheel", handleWheel);
        window.addEventListener("touchmove", handleTouch);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchmove", handleTouch);
        };
    }, [isOpen, pathname]);

    return (
        <>
            <div className={styles.fabContainer}>
                <button className={styles.fab} onClick={toggle} aria-label="Call Us">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                </button>
                <a href="https://wa.me/9718001522" target="_blank" rel="noopener noreferrer" className={styles.fab} aria-label="WhatsApp Us">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                </a>
            </div>

            <div className={`${styles.overlay} ${isOpen ? styles.isOpen : ""}`}>
                <button className={styles.closeButton} onClick={toggle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className={styles.formContainer}>
                    <div className={styles.leftSide}>
                        <h2>CONNECT WITH <span>THE BRAND</span></h2>
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
                        <button className={styles.confirmButton}>CONFIRM NOW</button>
                    </div>

                    <div className={styles.rightSide}>
                        <div className={styles.contactInfo}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                            </svg>
                            <span>800 15 22</span>
                        </div>
                        <div className={styles.contactInfo}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>SHEIKH ZAYED ROAD, DUBAI, UAE 341186</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactOverlay;
