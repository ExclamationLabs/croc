/**
 * watch.js
 *
 * Gulp task to watch the files and rebuild when changes
 * are made
 */

var gulp = require('gulp')
	, less = require('gulp-less')
	, path = require('path')
	, paths;

paths = {
	js:    path.join(assets, 'js/**/*.js'),
	less:  path.join(assets, 'style/**/*.{less,css}'),
	fonts: require('./fonts.js').assets,
	copy:  require('./copy.js').assets,
	svg:   require('./svgmin.js').assets
};

gulp.task('watch', function() {
	gulp.watch(paths.less,  ['less']);
	gulp.watch(paths.js,    ['browserify']);
	gulp.watch(paths.fonts, ['fonts']);
	gulp.watch(paths.copy,  ['copy']);
	gulp.watch(paths.svg,   ['svgmin']);
});