/** ============================================================================
    Project: Hello, GulpJS
    ----------------------------------------------------------------------------
    @description: Projeto para estudos de GulpJS
    @author: EdnilsonRobert <frontend@ednilsonrobert.dev>
============================================================================= */

/** VARIABLES =============================================================== */
const gulp = require('gulp'),
      browsersync = require('browser-sync'),
      notify = require('gulp-notify');

let messages = require('./gulpconfig.js').messages;


/** NOTIFY ================================================================== */
let htmlUpdated = () => {
  return gulp.src('./').pipe(notify(messages.html.update));
}


/** BROWSER SYNC ============================================================ */
let pageReload = () => {
  return gulp
  .src('./')
  .pipe(browsersync.reload({ stream: true }));
}
exports.pageReload = pageReload;

let dev = () => {
  browsersync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    port: 3000
  });

  gulp.src('./').pipe(notify(messages.gulp.isRunning));
  gulp.watch('./*.html', gulp.series(pageReload, htmlUpdated));
}
exports.dev = dev;


/** TASK DEFAULT ============================================================ */
gulp.task('default', gulp.series(dev), () => {
  console.log('>>> GulpJS works like a charm.');
});
