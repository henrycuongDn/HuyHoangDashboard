const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~/m': path.resolve(__dirname, 'src/modules'),
      'policy': path.resolve(__dirname, 'src/modules/policy'),
    },
  },
};