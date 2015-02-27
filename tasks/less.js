/**
 * less.js
 *
 * Gulp task to compile the main less file and run autoprefixer
 */

var gulp = require('gulp')
	, less = require('gulp-less')
	, autoprefixer = require('gulp-autoprefixer')
	, path = require('path')
	, paths;

paths = {
	main: path.join(assets, 'style/site.less'),
	dest: path.join(dest, 'style/')
};

gulp.task('less', function() {
	gulp.src(paths.main)
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(paths.dest));
});

module.exports = paths;