var config = {
  appSecret:'xooffer-u43-age24',
  address:'http://localhost:3005',
  emailpassword:'01711401197',
  emailId:'xooffer@gmail.com',
  tokenExpiry: '2 days', //in min
  accountType:{
    basic:'BASIC',
    admin:'ADMIN'
  },
  api:{
    auth:{
      registerUser:'/user',
      userLogin:'/user/login',
      updateUser:'/user/:id',
      removeUser:'/user/:id',
      getAllUser:'/user',
      getUserByID:'/user/:id',
      userEmailVerification:'/user/email-verification/:URL'
    }
  }
}

module.exports = config
