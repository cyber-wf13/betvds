const {src,	dest} = require('gulp');
const bs = require('browser-sync');

module.exports = function img() {
	return src('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
		.pipe(dest('dist/img'))
  	.pipe(bs.stream())
}