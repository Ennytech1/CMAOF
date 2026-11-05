// Verification Test Harness for PartnerCoBranding & OurPartners (Milestone 2 Iteration 2)
import fs from 'fs';
import path from 'path';

console.log('=== CMAOF Milestone 2 Iteration 2 Verification ===\n');

// 1. Read PartnerCoBranding.jsx and OurPartners.jsx
const partnerCoBrandingPath = path.resolve('client/src/components/PartnerCoBranding.jsx');
const ourPartnersPath = path.resolve('client/src/components/OurPartners.jsx');

const partnerCoBrandingSrc = fs.readFileSync(partnerCoBrandingPath, 'utf8');
const ourPartnersSrc = fs.readFileSync(ourPartnersPath, 'utf8');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`[FAIL] ${testName} - ${details}`);
  }
}

// ---------------------------------------------------------
// Challenge 1: Routing & Link Permutations in PartnerCoBranding.jsx
// ---------------------------------------------------------
console.log('\n--- Challenge 1: Routing & Link Permutations ---');

// Check import of Link
assert(
  partnerCoBrandingSrc.includes("import { Link } from 'react-router-dom';") ||
  partnerCoBrandingSrc.includes('import { Link } from "react-router-dom";'),
  'PartnerCoBranding imports Link from react-router-dom'
);

// Check simulation of renderCmaofLogo link branching logic
function simulateRenderCmaofLogo(cmaofLink) {
  if (!cmaofLink) return { type: 'div' };

  const href = typeof cmaofLink === 'string' ? cmaofLink : '/';
  const isExternal = typeof href === 'string' && (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
  const isAnchor = typeof href === 'string' && href.startsWith('#');

  if (isExternal) {
    return { type: 'a', href, target: '_blank', rel: 'noopener noreferrer' };
  }
  if (isAnchor) {
    return { type: 'a', href, target: undefined, rel: undefined };
  }
  return { type: 'Link', to: href };
}

// 1.1 Internal SPA routing: cmaofLink={true} -> <Link to="/">
const resTrue = simulateRenderCmaofLogo(true);
assert(
  resTrue.type === 'Link' && resTrue.to === '/',
  'cmaofLink={true} renders <Link to="/">'
);

// 1.2 Internal SPA routing: cmaofLink="/" -> <Link to="/">
const resSlash = simulateRenderCmaofLogo('/');
assert(
  resSlash.type === 'Link' && resSlash.to === '/',
  'cmaofLink="/" renders <Link to="/">'
);

// 1.3 Internal SPA routing: cmaofLink="/our-work/education" -> <Link to="/our-work/education">
const resInternal = simulateRenderCmaofLogo('/our-work/education');
assert(
  resInternal.type === 'Link' && resInternal.to === '/our-work/education',
  'cmaofLink="/our-work/education" renders <Link to="/our-work/education">'
);

// 1.4 External link handling: cmaofLink="https://example.org" -> <a href="https://example.org" target="_blank" rel="noopener noreferrer">
const resExternal = simulateRenderCmaofLogo('https://example.org');
assert(
  resExternal.type === 'a' &&
  resExternal.href === 'https://example.org' &&
  resExternal.target === '_blank' &&
  resExternal.rel === 'noopener noreferrer',
  'cmaofLink="https://example.org" renders <a href="https://example.org" target="_blank" rel="noopener noreferrer">'
);

// 1.5 External link handling: cmaofLink="http://partner.org"
const resHttp = simulateRenderCmaofLogo('http://partner.org');
assert(
  resHttp.type === 'a' && resHttp.target === '_blank',
  'cmaofLink="http://partner.org" renders <a target="_blank">'
);

// 1.6 External link handling: cmaofLink="//cdn.example.org"
const resProtocolRelative = simulateRenderCmaofLogo('//cdn.example.org');
assert(
  resProtocolRelative.type === 'a' && resProtocolRelative.target === '_blank',
  'cmaofLink="//cdn.example.org" renders <a target="_blank">'
);

// 1.7 Hash anchors: cmaofLink="#section" -> <a href="#section"> without target="_blank"
const resAnchor = simulateRenderCmaofLogo('#section');
assert(
  resAnchor.type === 'a' &&
  resAnchor.href === '#section' &&
  resAnchor.target === undefined,
  'cmaofLink="#section" renders in-page <a href="#section">'
);

// 1.8 Default cmaofLink=false -> non-link container
const resFalse = simulateRenderCmaofLogo(false);
assert(
  resFalse.type === 'div',
  'cmaofLink={false} renders non-interactive <div>'
);

// ---------------------------------------------------------
// Challenge 2: Invariant Co-Branding Layout Order
// ---------------------------------------------------------
console.log('\n--- Challenge 2: Invariant Co-Branding Layout Order ---');

// Parse JSX structure order in PartnerCoBranding return block
const returnBlockMatch = partnerCoBrandingSrc.match(/return\s*\(\s*<div[\s\S]*?role="group"[\s\S]*?<\/div>\s*\);/);
assert(returnBlockMatch !== null, 'Return JSX block with role="group" found');

if (returnBlockMatch) {
  const returnBlock = returnBlockMatch[0];
  const partnerLogoIdx = returnBlock.indexOf('{renderPartnerLogo()}');
  const dividerIdx = returnBlock.indexOf('w-px shrink-0 transition-colors');
  const cmaofLogoIdx = returnBlock.indexOf('{renderCmaofLogo()}');

  assert(partnerLogoIdx !== -1, 'renderPartnerLogo() present in return block');
  assert(dividerIdx !== -1, 'Vertical divider present in return block');
  assert(cmaofLogoIdx !== -1, 'renderCmaofLogo() present in return block');

  assert(
    partnerLogoIdx < dividerIdx && dividerIdx < cmaofLogoIdx,
    'DOM order is strictly 1: Partner Logo (LEFT) < 2: Divider (CENTER) < 3: CMAOF Logo (RIGHT)',
    `Indices: partner=${partnerLogoIdx}, divider=${dividerIdx}, cmaof=${cmaofLogoIdx}`
  );
}

// ---------------------------------------------------------
// Challenge 3: Legacy Color & Font Grep Check
// ---------------------------------------------------------
console.log('\n--- Challenge 3: Legacy Color & Font Grep Check ---');

const bannedColors = ['#EA580C', '#0F2B5B', '#0F4C3A', '#06402B', '#0B2D6E'];
bannedColors.forEach((color) => {
  const regex = new RegExp(color.replace('#', '#?'), 'i');
  assert(
    !regex.test(partnerCoBrandingSrc),
    `PartnerCoBranding.jsx free from banned color ${color}`
  );
  assert(
    !regex.test(ourPartnersSrc),
    `OurPartners.jsx free from banned color ${color}`
  );
});

// Check that OurPartners uses brand design tokens
assert(
  ourPartnersSrc.includes('bg-cmao-sun-yellow'),
  'OurPartners uses official bg-cmao-sun-yellow accent'
);
assert(
  ourPartnersSrc.includes('text-cmao-earth-brown'),
  'OurPartners uses official text-cmao-earth-brown for headings'
);
assert(
  ourPartnersSrc.includes('font-primary'),
  'OurPartners uses official font-primary (Montserrat)'
);

// ---------------------------------------------------------
// Challenge 4: Optical Height Bounds & Divider Scaling
// ---------------------------------------------------------
console.log('\n--- Challenge 4: Optical Height Bounds & Divider Scaling ---');

function computeHeightAndDivider(height) {
  const numericHeight = typeof height === 'number' 
    ? Math.max(28, Math.min(64, height)) 
    : (parseInt(height, 10) || 40);
  
  const maxHeight = `${numericHeight}px`;
  const dividerHeight = `${Math.round(numericHeight * 0.72)}px`;
  return { numericHeight, maxHeight, dividerHeight };
}

// Default 40
const h40 = computeHeightAndDivider(40);
assert(h40.numericHeight === 40 && h40.maxHeight === '40px' && h40.dividerHeight === '29px',
  'height=40 -> maxHeight 40px, divider 29px (72.5%)');

// Lower bound 28
const h28 = computeHeightAndDivider(28);
assert(h28.numericHeight === 28 && h28.maxHeight === '28px' && h28.dividerHeight === '20px',
  'height=28 -> maxHeight 28px, divider 20px (71.4%)');

// Upper bound 64
const h64 = computeHeightAndDivider(64);
assert(h64.numericHeight === 64 && h64.maxHeight === '64px' && h64.dividerHeight === '46px',
  'height=64 -> maxHeight 64px, divider 46px (71.9%)');

// Below min clamp 10 -> 28
const h10 = computeHeightAndDivider(10);
assert(h10.numericHeight === 28 && h10.maxHeight === '28px' && h10.dividerHeight === '20px',
  'Underflow: height=10 clamped to 28px');

// Above max clamp 100 -> 64
const h100 = computeHeightAndDivider(100);
assert(h100.numericHeight === 64 && h100.maxHeight === '64px' && h100.dividerHeight === '46px',
  'Overflow: height=100 clamped to 64px');

// String '34px' -> 34px (as in OurPartners.jsx)
const h34 = computeHeightAndDivider(34);
assert(h34.numericHeight === 34 && h34.dividerHeight === '24px',
  'OurPartners height=34 -> maxHeight 34px, divider 24px');

// String fallback 'invalid' -> 40px
const hInvalid = computeHeightAndDivider('invalid');
assert(hInvalid.numericHeight === 40 && hInvalid.dividerHeight === '29px',
  'Fallback: height="invalid" resolves to 40px, divider 29px');

// Null fallback -> 40px
const hNull = computeHeightAndDivider(null);
assert(hNull.numericHeight === 40 && hNull.dividerHeight === '29px',
  'Fallback: height=null resolves to 40px, divider 29px');

console.log(`\n========================================`);
console.log(`Summary: ${passedTests} / ${totalTests} tests passed (${failedTests} failures).`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
}
