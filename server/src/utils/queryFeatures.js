export const buildJobFilters = (query) => {
  const filters = {};

  if (query.location) {
    filters.location = { $regex: query.location, $options: "i" };
  }

  if (query.type) {
    filters.type = query.type;
  }

  if (query.experienceLevel) {
    filters.experienceLevel = query.experienceLevel;
  }

  if (query.skills) {
    const skills = query.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skills.length) {
      filters.skills = { $in: skills.map((skill) => new RegExp(skill, "i")) };
    }
  }

  if (query.status) {
    filters.status = query.status;
  }

  if (query.search) {
    filters.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { location: { $regex: query.search, $options: "i" } },
      { skills: { $elemMatch: { $regex: query.search, $options: "i" } } }
    ];
  }

  return filters;
};

export const getSortOption = (sortBy = "latest") => {
  const map = {
    latest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    salaryHigh: { salaryMax: -1 },
    salaryLow: { salaryMin: 1 }
  };

  return map[sortBy] || map.latest;
};
