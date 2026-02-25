const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY || config.extra?.REACT_APP_API_KEY || '',
  },
});
