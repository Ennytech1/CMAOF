import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CmaofLogo Component
 * Official Chief Michael Ade.Ojo Foundation (CMAOF) Logo System.
 * Seamlessly integrates the 3 official brand logo types:
 * - logoN.png: Horizontal lockup (Emblem + Foundation Name) for Navbars, headers, search modals
 * - logof.png: Dark-theme lockup with Earth Brown (#5B2E19) background for Footers & dark sections
 * - logo.png:  Vertical stacked lockup for Light cards, Login pages, Documents, Modals
 */
const CmaofLogo = ({
  layout = 'horizontal', // 'horizontal' | 'vertical'
  variant = 'light',      // 'light' | 'dark' | 'color'
  type,                  // explicit override: 'logo' | 'logof' | 'logoN' | 'navbar' | 'footer'
  size = 'md',           // 'sm' | 'md' | 'lg' | 'xl' or number in px
  clearSpace = false,
  showWatermark = false,
  asLink = true,
  className = '',
  imgClassName = '',
  alt = 'Chief Michael Ade.Ojo Foundation (CMAOF)',
  onClick,
}) => {
  const isLinkActive = asLink && !showWatermark;

  // Resolve logo source based on type, variant, and layout
  let logoSrc = '/images/logoN.png';
  let activeLayout = 'horizontal';

  if (type === 'logof' || type === 'footer' || variant === 'dark') {
    logoSrc = '/images/logof.png';
    activeLayout = 'vertical';
  } else if (type === 'logo' || layout === 'vertical') {
    logoSrc = '/images/logo.png';
    activeLayout = 'vertical';
  } else if (type === 'logoN' || type === 'navbar' || layout === 'horizontal') {
    logoSrc = '/images/logoN.png';
    activeLayout = 'horizontal';
  }

  // Preset heights matching official grid
  const sizeClasses = {
    horizontal: {
      sm: 'h-8 sm:h-9 w-auto',
      md: 'h-10 sm:h-11 md:h-12 w-auto',
      lg: 'h-13 sm:h-14 lg:h-15 w-auto',
      xl: 'h-16 sm:h-20 w-auto',
    },
    vertical: {
      sm: 'h-14 sm:h-16 w-auto',
      md: 'h-20 sm:h-24 w-auto',
      lg: 'h-28 sm:h-32 w-auto',
      xl: 'h-36 sm:h-44 w-auto',
    },
  };

  const isCustomHeight = typeof size === 'number' || (typeof size === 'string' && !['sm', 'md', 'lg', 'xl'].includes(size));
  const defaultSizeClass = !isCustomHeight ? (sizeClasses[activeLayout]?.[size] || sizeClasses.horizontal.md) : 'w-auto h-full';
  const finalImgClass = imgClassName ? imgClassName : `${defaultSizeClass} object-contain`;

  const customStyle = isCustomHeight ? { height: typeof size === 'number' ? `${size}px` : size } : {};

  const containerStyle = {
    ...(showWatermark ? { opacity: 0.08 } : {}),
    ...customStyle,
  };

  const imageElement = (
    <div
      className={`inline-flex items-center justify-center group select-none ${className} ${
        showWatermark ? 'pointer-events-none select-none' : ''
      }`}
      style={containerStyle}
    >
      <img
        src={logoSrc}
        alt={alt}
        title={alt}
        className={`${finalImgClass} transition-transform duration-200 ${
          isLinkActive ? 'group-hover:scale-[1.02]' : ''
        }`}
        loading="eager"
      />
    </div>
  );

  if (isLinkActive) {
    return (
      <Link to="/" aria-label={alt} onClick={onClick} className="inline-flex items-center focus:outline-none">
        {imageElement}
      </Link>
    );
  }

  return imageElement;
};

export default CmaofLogo;