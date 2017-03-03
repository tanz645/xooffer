
var utils = {
  checkRequest: function(req,res,next){
    console.log("Security Passed")
    next();
  },
  generateErrorInfo:function(msg,status,err){
    return {message:msg,status:status,error:err}
  },
  generateSuccessInfo:function(msg,status,data){
    return {message:msg,status:status,data:data}
  }
}

module.exports = utils;
