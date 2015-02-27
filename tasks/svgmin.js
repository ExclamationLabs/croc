/**
 * svgmin.js
 *
 * Gulp task to optimize and minify SVG files
 */

var gulp = require('gulp')
	, svgmin = require('gulp-svgmin')
	, path = require('path')
	, paths;

paths = {
	assets: path.join(assets, 'images/**/*.svg'),
	dest: path.join(dest, 'images')
};

gulp.task('svgmin', function() {
	gulp.src(paths.assets)
		.pipe(svgmin({
			plugins: [
				{ cleanupIDs: false } // Preserve the id attribues for SVG nodes
			]
		}))
		.pipe(gulp.dest(paths.dest));
});

module.exports = paths;