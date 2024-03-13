'use client';

import { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const requestRef = useRef<number | null>(null);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY !== prevScrollY || currentScrollY === 0) {
      setIsVisible(currentScrollY < prevScrollY);
      setPrevScrollY(currentScrollY);
    }
    requestRef.current = requestAnimationFrame(handleScroll);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(handleScroll);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, [prevScrollY]);

  return (
    <button
      className={`fixed bottom-8 right-8 transition-opacity rounded-full overflow-hidden border-2 border-green-light bg-white hover:shadow-md ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      } cursor-pointer`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    >
      <FaArrowUp className='text-4xl bg-white m-2 text-green-800 opacity-70' />
    </button>
  );
}
