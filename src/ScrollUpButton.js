import React, {useState, useEffect} from "react";
import './index.css';

const ScrollUpButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
       const toggleVisibility = () => {
           if (window.pageYOffset > 300) {
               setIsVisible(true);
           }
           else {
               setIsVisible(false);
           }
       };
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
            ^
        </button>
    );
};
export default ScrollUpButton;