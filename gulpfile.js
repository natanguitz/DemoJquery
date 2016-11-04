 /* jshint esversion:6 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('default', function(){

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch("index.html").on('change', browserSync.reload);
	gulp.watch('scss/*.scss', ['sass']);
	gulp.watch('prevfiles/*.css', ['cleanCSS']);
	gulp.watch('scripts/*.js', ['babel']);
	gulp.watch('prevfiles/*.js', ['uglify']);
	gulp.watch('scripts/*.js').on('change', browserSync.reload);
	gulp.watch('scss/*.scss').on('change', browserSync.reload);

});

gulp.task('sass', function(){
	gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./prevfiles'));
});

gulp.task('cleanCSS', function(){
	gulp.src('./prevfiles/*.css')
    .pipe(cleanCSS())
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./build/'));
});

gulp.task('babel', () => {
	return gulp.src('scripts/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./prevfiles'));
});

gulp.task('uglify', () => {
	return gulp.src('prevfiles/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});
