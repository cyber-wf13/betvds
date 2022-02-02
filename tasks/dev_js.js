const { src, dest } = require('gulp');
const compiler = require('webpack');
const webpackStream = require('webpack-stream');
const bs = require('browser-sync');

module.exports = function dev_js() {
	return src('src/js/**/*.js')
		.pipe(webpackStream(require('../webpack.dev.config'), compiler))
		.pipe(dest('dist/'))
		.pipe(bs.stream())
}