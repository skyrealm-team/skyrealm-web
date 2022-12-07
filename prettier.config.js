const fs = require("fs");
const src = fs.readdirSync("./src");

module.exports = {
  importOrder: [
    "^react(.*)$",
    "^next/(.*)$",
    "^@next/(.*)$",
    "^@emotion/(.*)$",
    "^@mui/(.*)$",
    "<THIRD_PARTY_MODULES>",
    `^(${src.join("|")})/(.*)$`,
    "^[./]",
  ],
  importOrderSeparation: true,
};
