var winston = require('winston');
var utils = {
  checkRequest: function(req,res,next){
    console.log("Security Passed")
    next();
  }
}

module.exports = utils;
