// Real Beneficiaries Dataset for CMAOF Public & Portal
// Populated dynamically from MongoDB Atlas database API (/api/beneficiaries)

export const BENEFICIARIES_DATA = [];

export const getBeneficiaryByIdOrCode = (identifier) => {
  if (!identifier) return null;
  const normalized = String(identifier).trim().toLowerCase();
  const found = BENEFICIARIES_DATA.find(
    (b) =>
      String(b.id) === normalized ||
      (b.code && b.code.toLowerCase() === normalized) ||
      (b.altCode && b.altCode.toLowerCase() === normalized) ||
      (b.name && b.name.toLowerCase().includes(normalized))
  );
  return found || null;
};
