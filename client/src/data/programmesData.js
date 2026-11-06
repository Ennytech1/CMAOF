// CMAOF Programmes Data Model
// Populated dynamically from MongoDB Atlas database API (/api/programmes)

export const PROGRAMMES_DATA = [];

export const enrichProgrammeData = (prog) => {
  if (!prog) return null;
  return {
    ...prog,
    stats: prog.stats || {
      beneficiaries: (prog.beneficiariesReached || 0).toLocaleString(),
      communities: prog.locationsCount || 0,
      schools: prog.schoolsCount || 0,
      completionRate: `${prog.percentageComplete || 0}%`,
    },
    objectivesList: Array.isArray(prog.objectivesList) ? prog.objectivesList : [],
    activities: Array.isArray(prog.activities) ? prog.activities : [],
    beneficiariesList: Array.isArray(prog.beneficiariesList) ? prog.beneficiariesList : [],
    locationsList: Array.isArray(prog.locationsList) ? prog.locationsList : [],
    partners: Array.isArray(prog.partners) ? prog.partners : [],
    kpis: Array.isArray(prog.kpis) ? prog.kpis : [],
    mediaList: Array.isArray(prog.mediaList) ? prog.mediaList : [],
    documentsList: Array.isArray(prog.documentsList) ? prog.documentsList : [],
  };
};

export const getProgrammeByIdOrSlug = (idOrSlug) => {
  if (!idOrSlug) return null;
  const found = PROGRAMMES_DATA.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  return found ? enrichProgrammeData(found) : null;
};
