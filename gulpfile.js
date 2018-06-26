const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      browsersync = require('browser-sync'),
      changed = require('gulp-changed'),
      concat = require('gulp-concat'),
      htmlcomb = require('gulp-htmlcomb'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin'),
      jshint = require('gulp-jshint'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify');

const PATH_SRC     = './src/',
      PATH_SRC_CSS = './src/resources/scss/',
      PATH_SRC_IMG = './src/resources/images/',
      PATH_SRC_JS  = './src/resources/js/';

const PATH_DIST     = './dist/',
      PATH_DIST_CSS = './dist/resources/css/',
      PATH_DIST_IMG = './dist/resources/images/',
      PATH_DIST_JS  = './dist/resources/js/';

// Compilar e minificar SCSS
gulp.task('pack-css', function() {
    return gulp
    .src(PATH_SRC_CSS + 'main.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        add: true,
        remove: true,
        flexbox: true
    }))
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(PATH_DIST_CSS));
});

// Validar JS
gulp.task('lint-js', function() {
    return gulp
    .src(PATH_SRC_JS + '*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

// Concatenar, minificar e renomear JS
gulp.task('pack-js', function() {
    return gulp
    .src(PATH_SRC_JS + '*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(PATH_DIST_JS));
});

// Otimizar imagens
gulp.task('pack-images', function() {
    return gulp
    .src(PATH_SRC_IMG + '*')
    .pipe(changed(PATH_DIST_IMG))
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }), /* entre 0 e 7 */
        imagemin.svgo({
            plugins: [
                { removeViewBox: true },
                { cleanupIDs: false }
            ]
        })
    ], { verbose: true }))
    .pipe(gulp.dest(PATH_DIST_IMG));
    // TODO: Aplicar formatos MozJPEG e WebP
    // TODO: Recordar imagens
});

// Formatar e minificar HTML
gulp.task('pack-html', function() {
    return gulp.src(PATH_SRC + '*.html')
    .pipe(htmlcomb({
        requireDoubleQuotationMarks: true,
        replaceSingleQuotationMarks: true,
        removeEmptyValues: true,
        removeNewlines: true,
        removeMultipleSpaces: true,
        order: [
            "title","class","id","name","data","src","href","alt","for","type","value","role","aria"
        ]
    }))
    .pipe(htmlmin({
        // maxLineLength: 300,
        useShortDoctype: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeComments: true,
        keepClosingSlash: false,
        collapseWhitespace: true,
        collapseBooleanAttributes: true
    }))
    .pipe(gulp.dest(PATH_DIST));
});

// Criar servidor e sincronizar navegador
gulp.task('browser-sync', function() {
    browsersync.init({
        server: {
            baseDir: PATH_DIST,
            index: './index.html'
        },
        port: 3000
    });
    gulp.watch(PATH_SRC + '*.html', ['pack-html']).on('change', browsersync.reload);
    gulp.watch(PATH_SRC_CSS + '*.scss', ['pack-css']).on('change', browsersync.reload);
    gulp.watch(PATH_SRC_JS + '*.js', ['lint-js', 'pack-js']).on('change', browsersync.reload);
});

// Tarefa principal
gulp.task('default', ['browser-sync'], function() {
    console.info('>>> Gulp funfando de boas...');
});

// gulp.task('default', function() {
//     console.info('>>> Gulp funfando de boas...');
// });
