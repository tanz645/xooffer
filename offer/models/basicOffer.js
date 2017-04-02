var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;
var config = require('../config/config');
var esClient = require('../utils/elasticsearch');

// create a schema

var BasicOfferSchema = new Schema({
  title: { type: String, required: true},
  geoLocations: [{
      country: {type: String, required: true},
      area: {type: String},
      address:{type: String, required: true},
      shoppingMall:{type: String, required: true}
      lat: {type: Number},
      lng: {type: Number}
    }],
  brandId: { type: String, required: true},
  offerDetails: { type: String, required: true},
  productDetails: [{ type: String, required: true}],
  primaryCategory: { type: String, required: true},
  subCategory: { type: String, required: true},
  activated: {type: Boolean, default:false}
  offerEnding: Date,
  offerStarted: Date,
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
});



BasicOfferSchema.plugin(mongoosastic, {
  esClient:esClient,
  index: 'xooffer',
  type: 'basic_offers'
});

var BasicOffer = mongoose.model('basic_offers', BasicOfferSchema);

BasicOffer.createMapping(function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  }else{
    console.log('mapping created!');
    console.log(mapping);
  }
});

module.exports = BasicOffer;
