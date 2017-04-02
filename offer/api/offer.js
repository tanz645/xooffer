var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var BasicOffer = require('../models/basicOffer');


/***************************
    Get All Offer
***************************/
router.get('/offer', function(req, res, next) {
  BasicOffer.search({}
  , function(err, results) {
    // results here
    console.log(err)
     if (err) throw err;
     res.send(results);
  });

});

router.post('/offer',function(req,res,next){
  console.log(req.body)
  var offer = new BasicOffer({
    title: req.body.title,
    locations:req.body.locations,
    brandId: req.body.brandId,
    offerDetails: req.body.offerDetails,
    productDetails: req.body.productDetails,
    primaryCategory: req.body.primaryCategory,
    subCategory: req.body.subCategory,
    offerEnding: req.body.offerEnding,
    offerStarted: req.body.offerStarted
  });

  offer.save(function(err){

    if (err) {
      res.send(err)
    }else{
      /* Document indexation on going */
      offer.on('es-indexed', function(err, data){

        if (err) {
          res.send(err)
        }
        res.send(data);
      });
    }

  });


});



module.exports = router;
