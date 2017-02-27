var express = require('express');
var router = express.Router();
var basicUser = require('../models/basicUser');

/* GET home page. */
router.post('/user', function(req, res, next) {
  console.log(req.body);
  var BasicUser = new basicUser();

  BasicUser.username = req.body.username;  // set the bears name (comes from the request)
  BasicUser.password = req.body.password;
  BasicUser.email = req.body.password;
   // save the bear and check for errors
  BasicUser.save(function(err) {
       if (err)
           res.send(err);

       res.send({ message: 'User created!',status:200 });
  });

});

router.get('/user/:id',function(req,res,next){

  console.log(req)
  res.send({ message: req.params.id,status:200 });
})

module.exports = router;
