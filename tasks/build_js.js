const { src, dest } = require('gulp');
const compiler = require('webpack');
const webpackStream = require('webpack-stream');

module.exports = function build_js() {
	return src('src/js/**/*.js')
		.pipe(webpackStream(require('../webpack.prod.config'), compiler))
		.pipe(dest('build/'))
}