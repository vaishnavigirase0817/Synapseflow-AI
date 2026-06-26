import { useState, useEffect } from 'react';

/**
 * useActiveSection — Returns the ID of the section currently intersecting the viewport.
 * @param {string[]} sectionIds - Array of section ID strings to observe.
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible (highest intersection ratio)
        let maxRatio = 0;
        let mostVisible = '';

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target.id;
          }
        });

        if (mostVisible) {
          setActiveSection(mostVisible);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sectionIds]);

  return activeSection;
}

/**
 * Utility to smoothly scroll to a section
 */
export const scrollToSection = (e, id) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    const navHeight = 80; // approximate navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Add highlight animation class temporarily if scrolling to dashboard
    if (id === 'dashboard') {
      element.classList.add('animate-highlight');
      setTimeout(() => element.classList.remove('animate-highlight'), 2000);
    }
  }
};
