const bs = require('browser-sync');

module.exports = function browserSync() {
	bs.init({
		server: "dist/",
		browser: 'chrome',
		logPrefix: 'BS-HTML:',
		logLevel: 'info',
		logConnections: true,
		logFileChanges: true,
		open: true,
	})

}
