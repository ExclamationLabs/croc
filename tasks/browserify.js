/**
 * browserify.js
 *
 * Gulp task to run browserify on the main javasript file
 */

var gulp = require('gulp')
	, browserify = require('browserify')
	, transform = require('vinyl-transform')
	, path = require('path')
	, paths;

paths = {
	main: path.join(assets, 'js/app.js'),
	dest: path.join(dest, 'js/')
};

gulp.task('browserify', function() {
	var browserified = transform(function(filename) {
		var b = browserify(filename);
		return b.bundle();
	});

	gulp.src(paths.main)
		.pipe(browserified)
		.pipe(gulp.dest(paths.dest));
});