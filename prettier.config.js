const fs = require("fs");
const src = fs.readdirSync("./src");

/** @type {import('prettier').Config & import('@trivago/prettier-plugin-sort-imports').PluginConfig} */
const prettierConfig = {
  importOrder: [
    "^react(.*)$",
    "^(@next|next)/(.*)$",
    "^(@emotion|@mui)/(.*)$",
    "<THIRD_PARTY_MODULES>",
    `^(${src.join("|")})/(.*)$`,
    "^[./]",
  ],
  importOrderSeparation: true,
};

module.exports = prettierConfig;
