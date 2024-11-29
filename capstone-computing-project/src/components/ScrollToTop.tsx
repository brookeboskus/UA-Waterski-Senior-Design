"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        setIsVisible(window.scrollY > 300); 
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 bg-[#9E1B32] text-white p-3 rounded-full shadow-lg hover:bg-[#B32346] transition duration-300 z-50"
            >
                ↑
            </button>
        )
    );
}
