const path = require('path');

module.exports = {
  ui: false,
  server: path.resolve(__dirname, 'dist'),
  port: 3333,
  ghostMode: false,
  notify: false,
  files: [
    path.resolve(__dirname, 'dist/styles/**/*.css'),
    path.resolve(__dirname, 'dist/scripts/**/*.js'),
    path.resolve(__dirname, 'dist/**/*.html'),
  ],
  serveStatic: [
    {
      route: ['/sass'],
      dir: path.resolve(__dirname, 'sass'),
    },
    {
      route: ['/postcss'],
      dir: path.resolve(__dirname, 'postcss'),
    },
    {
      route: ['/typescript'],
      dir: path.resolve(__dirname, 'typescript'),
    },
    {
      route: ['/flow'],
      dir: path.resolve(__dirname, 'flow'),
    },
  ],
};
