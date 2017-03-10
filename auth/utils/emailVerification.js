var basicUser = require('../models/basicUser');
var config = require('../config/config');
var utils = require('../utils/utils');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var nev = require('email-verification')(mongoose);
var emailTemplate = '<h4>Please click the link below to verify your <a href="www.xooffer.com">xooffer</a> account</h4>'+
            '<a href="${URL}">${URL}</a>'+
            '<p>Thank you for your support</p>'+
            '<div><h4>contact us</h4></div>';
var EmailVerification = {
  configure: function(){
    nev.configure({
        verificationURL: config.address+'/api/user/email-verification/${URL}',
        persistentUserModel: basicUser,
        tempUserCollection: 'xooffer_tempusers',

        transportOptions: {
            service: 'Gmail',
            auth: {
                user: config.emailId,
                pass: config.emailpassword
            }
        },
        verifyMailOptions: {
            from: 'Do Not Reply <support@xooffer.com>',
            subject: 'XOOFFER | Please confirm account',
            html: emailTemplate,
            text: 'Please confirm your account by clicking the following link: ${URL}'
        }
    }, function(err, options){
      console.log(err)
    });
  },
  generateTemporaryUserModel: function(){
    nev.generateTempUserModel(basicUser, function(err, tempUserModel) {
      if (err) {
        console.log(err);
        return;
      }

      console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
    });
  },
  createTemporaryUser: function(newUser,email,res){
    nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
         if (err) {
           return res.status(403).send(utils.generateErrorInfo('Creating temp user FAILED',403,null));
         }

         // user already exists in persistent collection

         if (existingPersistentUser) {
           return res.send(utils.generateSuccessInfo('You have already signed up and confirmed your account',200,null));
         }

         console.log("----------",newTempUser)
         // new user created
         if (newTempUser) {
           var URL = newTempUser[nev.options.URLFieldName];

           nev.sendVerificationEmail(email, URL, function(err, info) {
             if (err) {

               return res.status(403).send(utils.generateErrorInfo('Sending verification email FAILED',403,null));
             }
             return res.send(utils.generateSuccessInfo('An Email is sent to you, please check your mailbox.',200,null));
           });

         // user already exists in temporary collection!
         } else {

           return res.send(utils.generateSuccessInfo('You have already signed up. Please check your email to verify your account.',200,null));
         }


    });
  },
  resendVerificationEmail: function(email,res){
    nev.resendVerificationEmail(email, function(err, userFound) {
        if (err) {

          return res.status(403).send(utils.generateErrorInfo('resending verification email FAILED',403,null));
        }
        if (userFound) {

          return res.send(utils.generateSuccessInfo('An email has been sent to you, yet again. Please check it to verify your account.',200,null));
        } else {

          return res.status(403).send(utils.generateErrorInfo('Your verification code has expired. Please sign up again.',403,null));
        }
    });
  },
  confirmTemporaryUser: function(url,res){
    nev.confirmTempUser(url, function(err, user) {
      if (user) {
        nev.sendConfirmationEmail(user.email, function(err, info) {
          if (err) {
            return res.status(403).send(utils.generateErrorInfo('Sending confirmation email FAILED',403,null));
          }
          return res.send(utils.generateSuccessInfo('User Confirmed',200,info));

        });
      } else {

        return res.status(403).send(utils.generateErrorInfo('Confirming temp user FAILED',403,null));
      }
    });
  }

}// end

module.exports = EmailVerification;
