import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? false : true;
      
      // Only update state if the difference is greater than 10px and we're not at the top
      if (Math.abs(scrollY - lastScrollY) > 10) {
        setIsScrollingUp(direction);
      }
      
      setIsAtTop(scrollY < 10);
      setLastScrollY(scrollY);
    };

    const onScroll = () => {
      window.requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return { isScrollingUp, isAtTop };
}
