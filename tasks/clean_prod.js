const del = require("del");

module.exports =  function clean_prod(){
  return del(['build'])
}