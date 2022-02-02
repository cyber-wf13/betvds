const { src, dest } = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  concat = require('gulp-concat'),
  autoPrefix = require('gulp-autoprefixer'),
  sourceMap = require('gulp-sourcemaps'),
  bs = require('browser-sync');

module.exports = function dev_style() {
  return src([
    'src/scss/**/*.scss'
  ])
    .pipe(sourceMap.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(autoPrefix({
      cascade: false
    }))
    .pipe(concat('style.min.css'))
    .pipe(sourceMap.write('maps/'))
    .pipe(dest('dist/css'))
    .pipe(bs.stream())
}