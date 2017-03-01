var basicUser = require('../models/basicUser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var nev = require('email-verification')(mongoose);

nev.configure({
    verificationURL: 'localhost/user/email-verification/${URL}',
    persistentUserModel: basicUser,
    tempUserCollection: 'xooffer_tempusers',

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'tanzib@movingwalls.my',
            pass: '01711401197'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(err, options){
  console.log(err)
});


nev.generateTempUserModel(basicUser, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
     if (err) {
       return res.status(404).send('ERROR: creating temp user FAILED');
     }

     // user already exists in persistent collection
     if (existingPersistentUser) {
       return res.json({
         msg: 'You have already signed up and confirmed your account. Did you forget your password?'
       });
     }

     // new user created
     if (newTempUser) {
       var URL = newTempUser[nev.options.URLFieldName];

       nev.sendVerificationEmail(email, URL, function(err, info) {
         if (err) {
           return res.status(404).send('ERROR: sending verification email FAILED');
         }
         res.json({
           msg: 'An email has been sent to you. Please check it to verify your account.',
           info: info
         });
       });

     // user already exists in temporary collection!
     } else {
       res.json({
         msg: 'You have already signed up. Please check your email to verify your account.'
       });
     }
});
