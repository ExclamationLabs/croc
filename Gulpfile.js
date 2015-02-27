/**
 * Gulpfile.js
 *
 * Pulls in individual gulp tasks from the `tasks` directory.
 * To add a new task, simply create a new file within that
 * directory.
 */

var requireDir = require('require-dir')
	, path = require('path');

// Add the asset and dist paths to the global scope for
// access within each task
global.assets = path.join(process.cwd(), 'assets')
global.dest = path.join(process.cwd(), 'public');

requireDir('./tasks', { recurse: true });
