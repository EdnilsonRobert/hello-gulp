/** ============================================================================
    Project: Hello, GulpJS
    ----------------------------------------------------------------------------
    @description: Projeto para estudos de GulpJS
    @author: EdnilsonRobert <frontend@ednilsonrobert.dev>
============================================================================= */

/** VARIABLES =============================================================== */
const browsersync = require('browser-sync'),
      gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      notify = require('gulp-notify'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      sassdoc = require('sassdoc'),
      sourcemaps = require('gulp-sourcemaps');

let messages = require('./gulpconfig.js').messages;
let paths = require('./gulpconfig.js').paths;


/** NOTIFY ================================================================== */
let htmlUpdated = () => {
  return notify(messages.html.update);
}
let cssFailed = () => {
  return notify(messages.css.error).write(messages.css.cssErrorMessage);
}
let cssUpdated = () => {
  return notify(messages.css.success);
}


/** HTML ==================================================================== */
let htmlify = () => {
  return gulp
    .src(`${paths.root.src}/**/*.html`)
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
    .pipe(gulp.dest(paths.root.dest))
    .pipe(htmlUpdated());
}
exports.htmlify = htmlify;


/** CSS ===================================================================== */
let yyyymmdd = () => {
  let twoDigit = (n) => n < 10 ? `0${n}` : n;
  let now = new Date();

  return '' + now.getFullYear() + twoDigit(now.getMonth() + 1) + twoDigit(now.getDate());
}

let sassify = () => {
  return gulp
    .src(`${paths.css.src}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', sass.logError)
      .on('error', (err) => { cssFailed() }))
    .pipe(rename({ suffix: '.min' }))
    // .pipe(rename({ suffix: '.min', extname: '.css?v=' + yyyymmdd() }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(cssUpdated())
    .pipe(sassdocfy())
    .pipe(browsersync.reload({ stream: true }));
}
exports.sassify = sassify;

let sassdocfy = () => {
  let options = {
    dest: paths.docs.dest,
    verbose: true,
    display: {
      access: ['public', 'private'],
      alias: true,
      watermark: true
    },
    groups: {
      'undefined': 'Ungrouped',
      functions: 'Funções',
      mixins: 'Mixins'
    }
  }

  return gulp
    .src(`${paths.css.src}/**/*.scss`)
    .pipe(sassdoc(options));
}
exports.sassdocfy = sassdocfy;


/** BROWSER SYNC ============================================================ */
let pageReload = () => {
  return gulp
  .src(paths.root.dest)
  .pipe(browsersync.reload({ stream: true }));
}
exports.pageReload = pageReload;

let dev = () => {
  browsersync.init({
    server: {
      baseDir: paths.root.dest,
      index: 'index.html'
    },
    port: 3000
  });

  gulp.src(paths.root.src).pipe(notify(messages.gulp.isRunning));
  gulp.watch(`${paths.root.src}/*.html`, gulp.series(htmlify, pageReload));
  gulp.watch(`${paths.css.src}/**/*.scss`, gulp.series(sassify));
}
exports.dev = dev;


/** TASK DEFAULT ============================================================ */
gulp.task('default', gulp.series(dev), () => {
  console.log('>>> GulpJS works like a charm.');
});
