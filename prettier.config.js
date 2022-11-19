module.exports = {
  // Max 120 charactor for one line
  printWidth: 120,
  // 2 space for indentation
  tabWidth: 2,
  useTabs: false,
  // Semi at the end of line
  semi: true,
  // Use single quotes
  singleQuote: true,
  // Object's key is quoted only when necessary
  quoteProps: 'as-needed',
  // jsx does not use single quotes, but double quotes
  jsxSingleQuote: false,
  // Need a comma at the end
  trailingComma: 'all',
  // Leading and trailing braces are required
  bracketSpacing: true,
  // jsx tag back angle brackets need to wrap
  jsxBracketSameLine: false,
  // Arrow function, when there is only one parameter, parentheses are also required
  arrowParens: 'always',
  // The format of each file is the entire contents of the file
  rangeStart: 0,
  rangeEnd: Infinity,
  // No need to write @prettier at the beginning of the file
  requirePragma: false,
  // No need to automatically insert @prettier at the beginning of the file
  insertPragma: false,
  // Decide whether to break the html according to the display style
  htmlWhitespaceSensitivity: 'css',
  // Newline using lf
  endOfLine: 'lf',
};
