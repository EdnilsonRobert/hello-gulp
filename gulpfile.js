const gulp = require('gulp'),
      browsersync = require('browser-sync');

const PATH_SRC = './src/';

// Criar servidor e sincronizar navegador
gulp.task('browser-dev', function() {
    browsersync.init({
        server: {
            baseDir: PATH_SRC,
            index: './index.html'
        },
        port: 3000
    });
});

gulp.task('default', function() {
    console.info('>>> Gulp funfando de boas...');
});
