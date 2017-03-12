var config = {
  appSecret:'xooffer-u43-24',
  address:'http://localhost:3010',
  elasticsearchHost:'localhost:9200',
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
