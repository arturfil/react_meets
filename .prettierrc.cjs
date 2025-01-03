const config = {
  bracketSpacing: true,
  jsxSingleQuote: true,
  printWidth: 80,
  quoteProps: 'consistent',
  singleQuote: true,
  overrides: [
    {
      files: ['*.ts'],
      options: { tabWidth: 2 },
    },
  ],
  tabWidth: 2,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
