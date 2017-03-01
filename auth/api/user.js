var express = require('express');
var router = express.Router();
var basicUser = require('../models/basicUser');
var utils = require('../utils/utils');
var Token = require('../utils/token');

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
      Get User By username
***************************/
router.get('/user',Token.verifyToken,function(req,res,next){

  var username = req.user.username;

  if(!username)
    res.status(403).send(utils.generateErrorInfo('No username provided',403,null));


  basicUser.findOne({'username': username },function(err,user){
      if(err) {
        return res.status(500).send(utils.generateErrorInfo('Error getting user by name',500,null));
      }

      user.password = null;
      res.status(200).send(utils.generateSuccessInfo('Query successfull',200,user));
  })
});

/***************************
  Check Username Existance
***************************/

/***************************
      Get All User
***************************/
router.get('/user/all',Token.verifyToken,Token.verifyAdmin,function(req,res,next){

  basicUser.find({},function(err,users){
    console.log(users);
      if(err) {
        return res.send(utils.generateErrorInfo('Server error gettin all user',500,err));
      }

      res.send(utils.generateSuccessInfo('Query successfull',200,users));
  })
})


/***************************
      Save User
***************************/
router.post('/user', function(req, res, next) {

  var BasicUser = new basicUser();

  BasicUser.username = req.body.username;  // set the bears name (comes from the request)
  BasicUser.password = req.body.password;
  BasicUser.email = req.body.email;

  // BasicUser.gender = req.body.gender;
  // BasicUser.dateOfBirth = req.body.dateOfBirth;
  // BasicUser.country = req.body.country;
  // BasicUser.active = req.body.active;
  // BasicUser.favouriteBrands = req.body.favouriteBrands;
  // BasicUser.favouriteCategories = req.body.favouriteCategories;
  // BasicUser.favouriteKeyWords = req.body.favouriteKeyWords;
  // BasicUser.accountType = req.body.accountType;
  // BasicUser.created = req.body.password;
  // BasicUser.updated = req.body.password;
  // BasicUser.lastLogin = req.body.password;
   // save the bear and check for errors

  BasicUser.save(function(err,user) {
    if (err){
     return res.status(500).send(utils.generateErrorInfo('Error creating User',500));
    }
    user.password = null;
    res.status(200).send(utils.generateSuccessInfo('New User Created',200,user));
  });

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
