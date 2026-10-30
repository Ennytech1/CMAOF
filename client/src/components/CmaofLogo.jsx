import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CmaofLogo Component
 * Real official CMAOF logo assets:
 * - 'light' (on white/light backgrounds): uses '/images/CMAO Foundation hhhh.png'
 *   featuring the CMAOF tree emblem with green leaves, orange figures, dark green CMAOF
 *   typography, and the blue motto "Stronger People. Brighter Communities."
 * - 'dark' (on dark backgrounds, e.g. Navy/Forest Green footer, dark hero banners):
 *   uses '/images/CMAO Foundation Logo.png' featuring the orange emblem & crisp white typography.
 */
const CmaofLogo = ({ 
  variant = 'light', // 'light' (on white/light backgrounds) | 'dark' (on dark backgrounds)
  className = '',
  imgClassName = 'h-11 sm:h-12 md:h-13 w-auto object-contain',
  asLink = true 
}) => {
  const logoSrc = variant === 'dark' 
    ? '/images/CMAO Foundation Logo.png' 
    : '/images/CMAO Foundation hhhh.png';

  const content = (
    <div className={`inline-flex items-center group select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Chief Michael Ade.Ojo Foundation (CMAOF)"
        className={`${imgClassName} transition-transform duration-200 group-hover:scale-[1.02]`}
      />
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" aria-label="Chief Michael Ade.Ojo Foundation Home">
        {content}
      </Link>
    );
  }

  return content;
};

export default CmaofLogo;
