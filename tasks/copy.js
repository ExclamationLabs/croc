/**
 * copy.js
 *
 * Gulp task to copy static files to destination directory
 */

var gulp = require('gulp')
	, path = require('path')
	, paths;

paths = {
	assets: [
		path.join(assets, 'images/**/*.{jpg,png}'),
		path.join(assets, 'robots.txt'),
		path.join(assets, 'favicon.ico')
	],
	dest: path.join(dest, '/')
};

gulp.task('copy', function() {
	gulp.src(paths.assets, { base: assets })
		.pipe(gulp.dest(paths.dest));
});

module.exports = paths;