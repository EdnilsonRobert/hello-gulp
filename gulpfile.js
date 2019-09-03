/** ============================================================================
    Project: Hello, GulpJS
    ----------------------------------------------------------------------------
    @description: Projeto para estudos de GulpJS
    @author: EdnilsonRobert <frontend@ednilsonrobert.dev>
============================================================================= */

/** VARIABLES =============================================================== */
const gulp = require('gulp'),
      browsersync = require('browser-sync'),
      htmlmin = require('gulp-htmlmin'),
      notify = require('gulp-notify');

let messages = require('./gulpconfig.js').messages;
let paths = require('./gulpconfig.js').paths;


/** NOTIFY ================================================================== */
let htmlUpdated = () => {
  return notify(messages.html.update);
}


/** HTML ==================================================================== */
let htmlMinify = () => {
  return gulp
    .src(`${paths.src.root}/**/*.html`)
    .pipe(htmlmin({
      html5: true,
      maxLineLength: 300,
      removeComments: true,
      keepClosingSlash: false,
      removeEmptyElements: false,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeScriptTypeAttributes: true
    }))
    .pipe(gulp.dest(paths.dev.root))
    .pipe(htmlUpdated());
}
exports.htmlMinify = htmlMinify;


/** BROWSER SYNC ============================================================ */
let pageReload = () => {
  return gulp
  .src(paths.src.root)
  .pipe(browsersync.reload({ stream: true }));
}
exports.pageReload = pageReload;

let dev = () => {
  browsersync.init({
    server: {
      baseDir: paths.dev.root,
      index: 'index.html'
    },
    port: 3000
  });

  gulp.src(paths.src.root).pipe(notify(messages.gulp.isRunning));
  gulp.watch(`${paths.src.root}/*.html`, gulp.series(htmlMinify, pageReload));
}
exports.dev = dev;


/** TASK DEFAULT ============================================================ */
gulp.task('default', gulp.series(dev), () => {
  console.log('>>> GulpJS works like a charm.');
});
