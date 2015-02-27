/**
 * default.js
 *
 * The default Gulp task
 */

var gulp = require('gulp');

gulp.task('default', ['less', 'browserify', 'fonts', 'copy', 'svgmin', 'watch']);