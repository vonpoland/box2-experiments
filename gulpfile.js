const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const path = require('path');
const Builder = require('systemjs-builder');

gulp.task('compile', () => {
    var stream = gulp.src('public/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-es2015-modules-systemjs']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());

    stream.on('error', function() {});

    return stream;
});

gulp.task('build', function () {
    var builder = new Builder('public/js', 'public/systemJsConfig.js');

    return builder
        .buildStatic('boot.js', './prod/outfile.js', { minify: true, mangle: true, globalDefs: { DEBUG: false}})
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['public/js/**/*.js', 'public/index.html'], ['compile']);
});