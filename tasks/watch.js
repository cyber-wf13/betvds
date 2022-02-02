const {watch,	parallel, series} = require('gulp');

module.exports = function watching() {
	watch(['src/**/*.scss'], parallel('dev_style'));
	watch(['src/**/*.js', 'src/**/*.html'], parallel('dev_js'));
	watch('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)', parallel('img'));
	watch('src/fonts/**/*.ttf', parallel('fonts'));
}