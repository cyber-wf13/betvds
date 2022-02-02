const { src, dest } = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  concat = require('gulp-concat'),
  autoPrefix = require('gulp-autoprefixer');

module.exports = function build_style() {
  return src([
    'src/scss/**/*.scss'
  ])
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(autoPrefix({
      cascade: false
    }))
    .pipe(concat('style.min.css'))
    .pipe(dest('build/css'))
}