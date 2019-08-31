/** ============================================================================
    Project: Hello, GulpJS
    ----------------------------------------------------------------------------
    @description: Projeto para estudos de GulpJS
    @author: EdnilsonRobert <frontend@ednilsonrobert.dev>
============================================================================= */

/** ============================================================================
Variables
============================================================================= */
const browsersync = require('browser-sync'),
      gulp = require('gulp');

let pageReload = () => {
  return gulp
    .src('./')
    .pipe(browsersync.reload({ stream: true }));
}
exports.pageReload = pageReload;

/** ============================================================================
Browser Sync
============================================================================= */
let dev = () => {
  browsersync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    port: 3000
  });

  gulp.watch('./*.html', gulp.series(pageReload));
}
exports.dev = dev;

/** ============================================================================
Task default
============================================================================= */
gulp.task('default', gulp.series(dev), () => {
  console.log('>>> GulpJS works like a charm.');
});
