var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var BasicOffer = require('../models/basicOffer');
// var esClient = require('../utils/elasticsearch');


/***************************
    User Login
***************************/
router.get('/offer', function(req, res, next) {

  BasicOffer.search({
    "match" : {
        "_all" : "test name"
    }

  }
  , function(err, results) {
    // results here
    console.log(err)
     if (err) throw err;

     res.send(results);
  });

  // var offer = new BasicOffer({
  //   name: 'test name',
  //   details: 'test deatils',
  //   company: 'test company'
  // })
  //
  //
  // offer.save(function(err){
  //
  //   if (err) throw err;
  //   /* Document indexation on going */
  //   offer.on('es-indexed', function(err, data){
  //
  //     if (err) throw err;
  //     /* Document is indexed */
  //     res.send(data);
  //   });
  // });
});

module.exports = router;
