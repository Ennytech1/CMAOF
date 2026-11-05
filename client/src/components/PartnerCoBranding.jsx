import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PartnerCoBranding Component
 *
 * Official CMAOF Partnership Co-Branding Lockup:
 * Strict layout hierarchy:
 *   [Partner Logo (strictly on the LEFT)] | [Vertical Divider Bar in center] | [CMAO Foundation Logo on the RIGHT]
 *
 * Optical balance:
 * - Height alignment within standard 32px to 48px envelope (default 40px)
 * - Vertically centered flex alignment
 * - Proportional vertical divider bar (h-7 sm:h-8 w-px bg-cmao-light-grey/40)
 *
 * Props:
 * @param {string|React.ReactNode} partnerLogo - Image URL/path or custom React SVG/JSX component
 * @param {string} partnerName - Name of the partner organization (used for alt text & aria labels)
 * @param {string} [partnerLink] - Optional external website URL for the partner
 * @param {'light'|'dark'} [variant='light'] - Color theme ('light' for white/light bg, 'dark' for dark bg)
 * @param {'light'|'dark'} [cmaofVariant] - Alias for variant
 * @param {number|string} [height=40] - Optical height constraint (32px to 48px recommended)
 * @param {string} [className=''] - Additional classes for outer wrapper
 * @param {string|boolean} [cmaofLink=false] - Optional link for the CMAOF logo
 * @param {string} [ariaLabel] - Custom accessible description
 */
const PartnerCoBranding = ({
  partnerLogo,
  partnerName,
  partnerLink,
  variant = 'light',
  cmaofVariant,
  height = 42,
  className = '',
  cmaofLink = false,
  showCmaofLogo = false,
  ariaLabel,
}) => {
  const activeVariant = cmaofVariant || variant;

  // Normalize numeric height to px string, clamped to optical range 28px - 64px if numeric
  const numericHeight = typeof height === 'number' 
    ? Math.max(28, Math.min(64, height)) 
    : (parseInt(height, 10) || 42);
  
  const heightStyle = { maxHeight: `${numericHeight}px`, height: 'auto' };

  const computedAriaLabel = ariaLabel || `${partnerName} in partnership with Chief Michael Ade.Ojo Foundation`;

  // Render Partner Logo (Left)
  const renderPartnerLogo = () => {
    if (!partnerLogo) return null;

    let content = null;
    if (typeof partnerLogo === 'string') {
      if (partnerLogo.includes('access.png')) {
        content = (
          <div className="flex items-center justify-center overflow-hidden h-11 sm:h-12 w-32 sm:w-40">
            <svg 
              viewBox="22 215 508 126" 
              className="w-full h-full object-contain select-none transition-transform duration-200 group-hover:scale-105"
              aria-label={partnerName}
            >
              <image href={partnerLogo} x="0" y="0" width="554" height="554" />
            </svg>
          </div>
        );
      } else {
        content = (
          <img
            src={partnerLogo}
            alt={partnerName}
            title={partnerName}
            className="h-full w-auto object-contain select-none max-w-[150px] sm:max-w-[170px] transition-transform duration-200 group-hover:scale-105"
            style={heightStyle}
            loading="lazy"
          />
        );
      }
    } else if (React.isValidElement(partnerLogo)) {
      content = (
        <div 
          className="flex items-center justify-center shrink-0 max-w-[160px] sm:max-w-[180px]"
          style={heightStyle}
        >
          {partnerLogo}
        </div>
      );
    } else if (typeof partnerLogo === 'function') {
      const LogoComponent = partnerLogo;
      content = (
        <div 
          className="flex items-center justify-center shrink-0 max-w-[160px] sm:max-w-[180px]"
          style={heightStyle}
        >
          <LogoComponent />
        </div>
      );
    }

    if (partnerLink) {
      return (
        <a
          href={partnerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-cmao-sun-yellow/40 rounded-xs"
          aria-label={`Visit ${partnerName} official website (opens in a new tab)`}
        >
          {content}
        </a>
      );
    }

    return (
      <div className="inline-flex items-center justify-center shrink-0">
        {content}
      </div>
    );
  };

  // Render CMAOF Logo (Right)
  const renderCmaofLogo = () => {
    const isDark = activeVariant === 'dark';
    const primarySrc = isDark ? '/images/logof.png' : '/images/logoN.png';
    const fallbackSrc = isDark ? '/images/logof.png' : '/images/logo.png';

    const cmaofImg = (
      <img
        src={primarySrc}
        alt="Chief Michael Ade.Ojo Foundation"
        title="Chief Michael Ade.Ojo Foundation"
        className="h-full w-auto object-contain select-none max-w-[160px] sm:max-w-[190px] transition-transform duration-200 group-hover:scale-[1.02]"
        style={heightStyle}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackSrc;
        }}
      />
    );

    if (cmaofLink) {
      const href = typeof cmaofLink === 'string' ? cmaofLink : '/';
      const isExternal = typeof href === 'string' && (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      );
      const isAnchor = typeof href === 'string' && href.startsWith('#');

      const linkClasses = "inline-flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-cmao-sun-yellow/40 rounded-xs";
      const linkAriaLabel = "Chief Michael Ade.Ojo Foundation Home";

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
            aria-label={linkAriaLabel}
          >
            {cmaofImg}
          </a>
        );
      }

      if (isAnchor) {
        return (
          <a
            href={href}
            className={linkClasses}
            aria-label={linkAriaLabel}
          >
            {cmaofImg}
          </a>
        );
      }

      return (
        <Link
          to={href}
          className={linkClasses}
          aria-label={linkAriaLabel}
        >
          {cmaofImg}
        </Link>
      );
    }

    return (
      <div className="inline-flex items-center justify-center shrink-0">
        {cmaofImg}
      </div>
    );
  };

  const isDark = activeVariant === 'dark';

  return (
    <div
      role="group"
      aria-label={computedAriaLabel}
      className={`inline-flex items-center justify-center select-none ${className}`}
    >
      {/* 1. Partner Logo */}
      <div className="shrink-0 flex items-center justify-center">
        {renderPartnerLogo()}
      </div>

      {/* 2. Optional CMAO Foundation Logo with Divider (only shown if showCmaofLogo=true) */}
      {showCmaofLogo && (
        <>
          <div
            className={`w-px shrink-0 transition-colors mx-3 sm:mx-4 ${
              isDark ? 'bg-white/30' : 'bg-cmao-light-grey/40'
            }`}
            style={{ height: `${Math.round(numericHeight * 0.72)}px` }}
            aria-hidden="true"
          />

          <div className="shrink-0 flex items-center justify-center">
            {renderCmaofLogo()}
          </div>
        </>
      )}
    </div>
  );
};

export default PartnerCoBranding;
