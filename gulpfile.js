const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

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


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['public/js/**/*.js', 'public/index.html'], ['compile']);
});