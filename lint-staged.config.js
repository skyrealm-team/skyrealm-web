const lintStagedConfig = {
  "**/*.{ts,tsx,js,jsx}": (filenames) => {
    return [`prettier --write ${filenames.join(" ")}`, `next lint --fix`];
  },
  "**/*.{md,json}": (filenames) => {
    return [`prettier --write ${filenames.join(" ")}`];
  },
};

module.exports = lintStagedConfig;
