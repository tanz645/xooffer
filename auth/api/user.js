var express = require('express');
var router = express.Router();
var basicUser = require('../models/basicUser');
var utils = require('../utils/utils');

/***************************
      Get User By ID
***************************/
router.get('/user/:id',function(req,res,next){

  var id = req.params.id;
  basicUser.findOne({ _id: id },function(err,user){
      if(err) {
        res.send(utils.generateErrorInfo('Server error',500,null));
        return next(err);
      }

      console.log(user)
      // var user = JSON.parse(user);
      user.password = null;
      res.send(utils.generateSuccessInfo('Query successfull',200,user));
  })
})

/***************************
      Get All User
***************************/
// router.get('/user',function(req,res,next){
//
//   basicUser.find({},function(err,users){
//       if(err) {
//         res.send(utils.generateErrorInfo('Server error',500,null));
//         return next(err);
//       }
//
//       res.send(utils.generateSuccessInfo('Query successfull',200,users));
//   })
// })


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
  BasicUser.save(function(err) {
    if (err){
     res.send(utils.generateErrorInfo('Error creating User',500,null));
     return next(err);
    }
    user.password = null;
    res.send(utils.generateSuccessInfo('New User Created',200,user));
  });

});


/***************************
    User Login
***************************/
router.post('/user/login', function(req, res, next) {

  basicUser.getAuthenticated(req.body.username,req.body.password,function(err,user,reason){

    if (err){
      res.send(utils.generateErrorInfo('Login not successful',500,null));
      return next(err);
    }
    if (user) {

      user.password = null;
      var token = null;
      res.send(utils.generateSuccessInfo('Login successfull',200,token));
    }
    if (!user) {
      res.send(utils.generateErrorInfo('Login not Successful',200,null));
    }


  })

});



module.exports = router;
