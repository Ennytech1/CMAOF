import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CmaofLogo Component
 * Features the official CMAOF tree emblem and color palette:
 * - Forest Green (#06402B) for "CMAOF" and "CHIEF MICHAEL ADE.OJO FOUNDATION"
 * - Deep Royal Navy Blue (#0B2D6E) for "Stronger People. Brighter Communities."
 * - Vibrant Orange (#EA580C) and Green (#06402B) for community tree figures
 */
const CmaofLogo = ({ 
  variant = 'light', // 'light' (on white/light backgrounds) | 'dark' (on dark backgrounds)
  className = '',
  imgClassName = 'h-11 sm:h-12 md:h-13 w-auto object-contain',
  asLink = true 
}) => {
  const logoSrc = variant === 'dark' 
    ? '/images/cmaof_logo_dark.svg' 
    : '/images/cmaof_logo.svg';

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
