const gulp = require('gulp'),
      browsersync = require('browser-sync'),
      htmlcomb = require('gulp-htmlcomb'),
      htmlmin = require('gulp-htmlmin');

const PATH_SRC  = './src/';
const PATH_DIST = './dist/';

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
});

// Tarefa principal
gulp.task('default', ['browser-sync'], function() {
    console.info('>>> Gulp funfando de boas...');
});

// gulp.task('default', function() {
//     console.info('>>> Gulp funfando de boas...');
// });
