var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config/config');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// max of 10 attempts, resulting in a 2 hour lock
var MAX_LOGIN_ATTEMPTS = 10;
var LOCK_TIME = 2 * 60 * 60 * 1000;

// create a schema
var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true ,unique: true},
  gender: String,
  dateOfBirth: Date,
  country: String,
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number },
  active:{type:Boolean, default:false},
  favouriteBrands:[],
  favouriteCategories:[],
  favouriteKeyWords:[],
  accountType:{type: String, default:config.accountType.basic},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  lastLogin:Date
});

UserSchema.virtual('isLocked').get(function() {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

/*
  Trigger Before saving
*/
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb);
    }
    // otherwise incrementing
    var updates = { $inc: { loginAttempts: 1 } };
    // lock the account if reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }
    return this.update(updates, cb);
};

// expose enum on the model, and provide an internal convenience reference
var reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};

UserSchema.statics.getAuthenticated = function(username, password,cb) {
  this.findOne({ username: username }, function(err, user) {
      if (err) return cb(err);
      console.log(err);
      // make sure the user exists
      if (!user) {
          return cb(null, null, "User or password not correct");
      }

      // check if the account is currently locked
      if (user.isLocked) {
          // just increment login attempts if account is already locked
          return user.incLoginAttempts(function(err) {
              if (err) return cb(err);
              return cb(null, null, "Maximum attempt exceed");
          });
      }

      // test for a matching password
      user.comparePassword(password, function(err, isMatch) {
          if (err) return cb(err);

          // check if the password was a match
          if (isMatch) {
              // if there's no lock or failed attempts, just return the user
              if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
              // reset attempts and lock info
              var updates = {
                  $set: { loginAttempts: 0 },
                  $unset: { lockUntil: 1 }
              };
              return user.update(updates, function(err) {
                  if (err) return cb(err);
                  return cb(null, user);
              });
          }

          // password is incorrect, so increment login attempts before responding
          user.incLoginAttempts(function(err) {
              if (err) return cb(err);
              return cb(null, null, "User or password not correct");
          });
      });
  });
};

var User = mongoose.model('users', UserSchema);

module.exports = User;
