"use client";

import { Icons } from '@/components/../constants/icons';
import React from 'react';

const ScrollToTopButton: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const Icon = Icons['arrowup'];

  return (
    <button 
      onClick={scrollToTop} 
      style={styles.button}
    >
        <Icon className={`size-7`} color="#8f8f8f" />
    </button>
  );
};

const styles = {
  button: {
    // position: 'fixed',
    // bottom: '20px',
    // right: '500px',
    // padding: '10px 20px',
    // fontSize: '16px',
    backgroundColor: '#09090b',
    color: '#fff',
    border: 'none',
    // borderRadius: '50px',
    cursor: 'pointer'
  } as React.CSSProperties
};

export default ScrollToTopButton;
