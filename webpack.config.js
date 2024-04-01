const path = require('path');

module.exports = {
  entry: './js/bootstrap.js',
  experiments: {
    asyncWebAssembly: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js'),
  },
};
