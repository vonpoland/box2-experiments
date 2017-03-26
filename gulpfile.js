const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('dev', () => {
    return gulp.src('public/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});