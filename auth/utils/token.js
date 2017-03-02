var jwt = require('jsonwebtoken');
var config = require('../config/config');
var utils = require('./utils');
var basicUser = require('../models/basicUser');


var token = {
  generateToken:function(data){
    var token = jwt.sign(data, config.appSecret, { algorithm: 'HS512', expiresIn: config.tokenExpiry});

    return token;
  },
  verifyToken:function(req,res,next){
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, config.appSecret, function(err, decoded) {
        if (err) {
          res.status(403).send(utils.generateErrorInfo('Failed to authenticate token',403,err));
        } else {

          basicUser.findOne({'username':decoded._doc.username},function(err,user){
            if(err){
              res.status(403).send(utils.generateErrorInfo('Failed to authenticate token',403,null));
            }else{
              if(user){
                user.password = null;
                req.user = user;
                next();
              }else{
                res.status(403).send(utils.generateErrorInfo('Failed to authenticate token',403,null));                
              }

            }

          })

        }
      });

    } else {
      return res.status(403).send(utils.generateErrorInfo('No token provided',403,null));
    }
  },
  verifyAdmin:function(req,res,next){
    var usertype = req.user.accountType;

    if(usertype === config.accountType.admin){

      next();
    }else{
      return res.status(403).send(utils.generateErrorInfo('User not authorized',403,null));
    };

  }
}

module.exports = token;
