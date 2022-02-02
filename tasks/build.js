const {src, dest} = require("gulp");

module.exports = function build(){
  return src([
  'dist/fonts/**/*',
], {base: 'dist'})
.pipe(dest("build"))
}