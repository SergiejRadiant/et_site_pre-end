var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return (gulp
      .src([
        "./app/libs/jquery/jquery-3.2.1.min.js",
        './app/libs/datepicker/jquery-ui.min.js',
        "./app/libs/magnific/jquery.magnific-popup.min.js",
        './app/libs/jQuery.mmenu/dist/js/jquery.mmenu.all.min.js',
        './app/libs/slick-carousel/slick.min.js',
        './app/libs/poshytip-1.2/jquery.poshytip.min.js',
        './app/libs/timepicki/timepicki.js',
      ])
      .pipe(concat("libs.js"))
      // .pipe(uglify()) //Minify libs.js
      .pipe(gulp.dest("./app/js/")) );
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
