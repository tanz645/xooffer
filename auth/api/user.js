var express = require('express');
var router = express.Router();
var basicUser = require('../models/basicUser');
var utils = require('../utils/utils');
var Token = require('../utils/token');
var EmailVerification = require('../utils/emailVerification');
var config = require('../config/config');

/********************************
  Initialize Email Verification
*********************************/
EmailVerification.configure();
EmailVerification.generateTemporaryUserModel();

/***************************
      Get User By ID
***************************/
// router.get('/user/:id',Token.verifyToken,function(req,res,next){
//
//   var id = req.params.id;
//
//   basicUser.findOne({ _id: id },function(err,user){
//       if(err) {
//         return res.status(500).send(utils.generateErrorInfo('Error Getting user',500,null));
//
//       }
//
//       user.password = null;
//       res.status(200).send(utils.generateSuccessInfo('Query successfull',200,user));
//   })
// })

/***************************
      Get User By Id
***************************/
router.get('/user/:id',Token.verifyToken,function(req,res,next){

  var username = req.user.username;
  var id = req.params.id;
  var usertype = req.user.accountType;

  if(!username)
    return res.status(403).send(utils.generateErrorInfo('No username provided',403,null));

  if(!id)
    return res.status(403).send(utils.generateErrorInfo('No username provided',403,null));

  basicUser.findOne({_id: id },function(err,user){
      if(err) {
        return res.status(500).send(utils.generateErrorInfo('Error getting user by name',500,null));
      }

      if(!user){
        return res.status(403).send(utils.generateErrorInfo('No User Found',403,null));
      }

      if(user.username === username || usertype === config.accountType.admin){
        res.send(utils.generateSuccessInfo('Query successfull',200,user));

      }else{
        return res.status(403).send(utils.generateErrorInfo('Not authorized to remove',403,null));
      }
  });

});

/***************************
      Delete User
***************************/
router.delete('/user/:id',Token.verifyToken,function(req,res,next){

  var id = req.params.id;
  var usertype = req.user.accountType;
  var username = req.user.username;

  if(!id)
    return res.status(403).send(utils.generateErrorInfo('No username provided',403,null));


  basicUser.findOne({_id: id },function(err,user){
      if(err) {
        return res.status(500).send(utils.generateErrorInfo('Error getting user by name',500,null));
      }

      if(!user){
        return res.status(403).send(utils.generateErrorInfo('No User Found',403,null));
      }

      if(user.username === username || usertype === config.accountType.admin){
        basicUser.remove({_id:id},function(err,user){
          if(err){
            return res.status(403).send(utils.generateErrorInfo('Error removing User',403,null));
          }

          res.send(utils.generateSuccessInfo('Remove User, successfull',200,null));
        })
      }else{
        return res.status(403).send(utils.generateErrorInfo('Not authorized to remove',403,null));
      }
  })
});

/***************************
        Update User
***************************/
router.put('/user/:id',Token.verifyToken,function(req,res,next){

  var id = req.params.id;

  if(!id)
    return res.status(403).send(utils.generateErrorInfo('No username provided',403,null));

  var usertype = req.user.accountType;
  var username = req.user.username;


  basicUser.findOne({_id: id },function(err,user){
      if(err) {
        return res.status(500).send(utils.generateErrorInfo('Error getting user by name',500,null));
      }

      if(!user){
        return res.status(403).send(utils.generateErrorInfo('No User Found',403,null));
      }

      if(user.username === username || usertype === config.accountType.admin){

        // user.password = req.body.password;
        // user.email = req.body.email;
        user.gender = req.body.gender;
        user.dateOfBirth = req.body.dateOfBirth;
        user.country = req.body.country;
        // user.favouriteBrands = req.body.favouriteBrands;
        // user.favouriteCategories = req.body.favouriteCategories;
        // user.favouriteKeyWords = req.body.favouriteKeyWords;
        user.updated = Date.now();
        user.save(function(err,data){
          if(err)
            return res.status(500).send(utils.generateErrorInfo('User information could not be updated'));

          res.status(200).send(utils.generateSuccessInfo('User information updated succesfully',200,data));
        })

      }else{
        return res.status(403).send(utils.generateErrorInfo('Not authorized to remove',403,null));
      }
  })
});

/***************************
      Get All User
***************************/
router.get('/user',Token.verifyToken,Token.verifyAdmin,function(req,res,next){

  basicUser.find({},function(err,users){

      if(err) {
        return res.send(utils.generateErrorInfo('Server error gettin all user',500,err));
      }

      res.send(utils.generateSuccessInfo('Query successfull',200,users));
  })
})


/***************************
      Register User
***************************/
router.post('/user', function(req, res, next) {

  var BasicUser = new basicUser();

  BasicUser.username = req.body.username;  // set the bears name (comes from the request)
  BasicUser.password = req.body.password;
  BasicUser.email = req.body.email;

  basicUser.findOne({'username': req.body.username },function(err,user){
     if(err) {
       return res.status(500).send(utils.generateErrorInfo('Error getting user by name',500,null));
     }
     if(!user){
       EmailVerification.createTemporaryUser(BasicUser,req.body.email,res);
     }else{
       return res.status(200).send(utils.generateErrorInfo('Username Already exists',200,null));
     }
  });
});

/***************************
      user accesses the link that is sent
***************************/
router.get('/user/email-verification/:URL', function(req, res) {
  var url = req.params.URL;

  EmailVerification.confirmTemporaryUser(url,res);
});


/***************************
    User Login
***************************/
router.post('/user/login', function(req, res, next) {

  basicUser.getAuthenticated(req.body.username,req.body.password,function(err,user,reason){

    if (err){
      return res.status(500).send(utils.generateErrorInfo('Login not successful',500,null));

    }

    if (!user) {
      res.status(403).send(utils.generateErrorInfo('Login not successful',403,null));
    }

    if (user) {
      user.password = null;
      var token = Token.generateToken(user);

      res.status(200).send(utils.generateSuccessInfo('Login successfull',200,{token:token}));
    }
  })

});



module.exports = router;
