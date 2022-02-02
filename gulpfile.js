const gulp = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks/');

exports.style = tasks.style;
exports.build_style = tasks.build_style;
exports.build_js = tasks.build_js;
exports.dev_style = tasks.dev_style;
exports.dev_js = tasks.dev_js;
exports.build = tasks.build;
exports.clean_prod = tasks.clean_prod;
exports.clean_dev = tasks.clean_dev;
exports.minify_img = tasks.minify_img;
exports.img = tasks.img;
exports.fonts = tasks.fonts;
exports.bs = tasks.bs;
exports.watch = tasks.watch;

exports.default = gulp.series(exports.clean_dev,
	gulp.parallel(
		exports.dev_style,
		exports.fonts,
		exports.img,
		exports.dev_js,
		exports.bs,
		exports.watch
	))

exports.build = gulp.series(exports.clean_prod, exports.build, exports.minify_img, exports.build_style, exports.build_js);
