var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config/config');
// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  gender: String,
  dateOfBirth: Date,
  country: String,
  active:{type:Boolean, Default:false},
  favouriteBrands:[],
  favouriteCategories:[],
  favouriteKeyWords:[],
  accountType:{type: String, Default:config.accountType.basic},
  created: {type: Date, Default: Date.now()},
  updated:Date,
  lastLogin:Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
