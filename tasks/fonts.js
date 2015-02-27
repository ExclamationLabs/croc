/**
 * fonts.js
 *
 * Gulp task to move font files to the destination directory
 */

var gulp = require('gulp')
	, path = require('path')
	, paths;

paths = {
	assets: path.join(assets, 'fonts/**/*.{ttf,otf,woff,eot,svg}'),
	dest: path.join(dest, 'fonts/')
};

gulp.task('fonts', function() {
	gulp.src(paths.assets)
		.pipe(gulp.dest(paths.dest));
});

module.exports = paths;