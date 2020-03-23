/** ============================================================================
    Project: Hello, GulpJS
    ----------------------------------------------------------------------------
    @description: Projeto para estudos de GulpJS
    @author: EdnilsonRobert <frontend@ednilsonrobert.dev>
============================================================================= */

/** VARIABLES =============================================================== */
const browsersync = require('browser-sync'),
      gulp = require('gulp'),
      concat = require('gulp-concat'),
      eslint = require('gulp-eslint'),
      htmlmin = require('gulp-htmlmin'),
      notify = require('gulp-notify'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      sassdoc = require('sassdoc'),
      sourcemaps = require('gulp-sourcemaps'),
      terser = require('gulp-terser');

let messages = require('./gulpconfig.js').messages;
let paths = require('./gulpconfig.js').paths;


/** NOTIFY ================================================================== */
let htmlUpdated = () => {
  return notify(messages.html.success);
};
let cssFailed = () => {
  return notify(messages.css.error).write(messages.css.cssErrorMessage);
};
let cssUpdated = () => {
  return notify(messages.css.success);
};
let jsFailed = () => {
  return notify(messages.js.error).write(messages.js.jsErrorMessage);
};
let jsUpdated = () => {
  return notify(messages.js.success);
};


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
};
exports.htmlify = htmlify;


/** CSS ===================================================================== */
let sassify = () => {
  return gulp
    .src(`${paths.css.src}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', sass.logError)
      .on('error', (err) => {
        console.log(`Console de erros [Notifier]: ${err}`);
        cssFailed();
      }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(cssUpdated())
    .pipe(sassdocfy())
    .pipe(browsersync.reload({ stream: true }));
};
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
  };

  return gulp
    .src(`${paths.css.src}/**/*.scss`)
    .pipe(sassdoc(options));
};
exports.sassdocfy = sassdocfy;


/** JAVASCRIPT ============================================================== */
let jsify = () => {
  console.log(`Environment: ${process.env.NODE_ENV}.`);
  return gulp
    .src(`${paths.js.src}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.results(results => {
      const countE = results.errorCount;
      const countW = results.warningCount;
      if(countE !== 0 || countW !== 0) jsFailed();
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(terser({
      parse: { ecma: 2017 },
      compress: { ecma: 5 },
      output: { ecma: 5 },
      keep_classnames: false,
      keep_fnames: false,
      toplevel: false,
      warnings: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(jsUpdated())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browsersync.reload({ stream: true }));
};
exports.jsify = jsify;

let lintifyGulp = () => {
  return gulp
    .src('./gulpfile.js')
    .pipe(eslint())
    .pipe(eslint.results(results => {
      const countE = results.errorCount;
      const countW = results.warningCount;
      if(countE !== 0 || countW !== 0) jsFailed();
    }))
    .pipe(eslint.format());
};
exports.lintifyGulp = lintifyGulp;


/** BROWSER SYNC ============================================================ */
let pageReload = () => {
  return gulp
    .src(paths.root.dest)
    .pipe(browsersync.reload({ stream: true }));
};
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
  gulp.watch(`${paths.js.src}/**/*.js`, gulp.series(jsify));
};
exports.dev = dev;


/** TASK DEFAULT ============================================================ */
gulp.task('default', gulp.series(dev), () => {
  console.log('>>> GulpJS works like a charm.');
});
