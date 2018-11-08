var express = require('express');
var router = express.Router();

const {_} = require('../config/utils')
const {sendSMS, sendOTP} = require('../config')
const {SERVICES, TYPE} = require('../config/config')


const validateSMS = function(object){

  const errors = {}
  console.log(object.to.length)
  if(_.isEmpty(object.to) || object.to.length !== 10){
      errors.to = 'Not a Valid Contact Number'
  }

  if(_.isEmpty(object.text) && object.type !== TYPE.OTP){
      errors.text = 'Message Body cannot be empty'
  }

  if(_.isEmpty(object.type)){
      errors.type = 'Message type cannot be empty'
  }else{
    var isExist = false;
    Object.keys(TYPE).forEach(key=>{
        if(TYPE[key] === object.type){
            isExist = true
        }
    })
    if(!isExist){
        errors.service = 'Invalid Type'
    }
}


  

  if(_.isEmpty(object.service)){
      object.service = SERVICES.MSG91
  }else{
      var isExist = false;
      Object.keys(SERVICES).forEach(key=>{
          if(SERVICES[key] === object.service){
              isExist = true
          }
      })
      if(!isExist){
          errors.service = 'Invalid Service'
      }
  }

  return {
      isValid : _.isEmpty(errors),
      errors : errors
  }
}



router.post('/send-sms', function(request, response) {
      var body = _.pick(request.body,['text','to','service','type'])
      console.log(body)
      var {isValid, errors} = validateSMS(body)
      body['body'] = body.text
      if(isValid){
        if(body.type !== TYPE.OTP){
          sendSMS(body,(error, result)=>{
            if(error){
              console.log(error)
              response.send({error,message : "Error Occured"})
            }else{
              if(!result){
                response.send({result : null,message : 'Nothing happened'})
              }else{
                console.log(result)
                response.status(200).send({result,message : 'Message sent successfully'})
              }
            }
          })
        }else{
          sendOTP(body,(error, result)=>{
            if(error){
              console.log(error)
              response.send({error,message : "Error Occured"})
            }else{
              if(!result){
                response.send({result : null,message : 'Nothing happened'})
              }else{
                console.log(result)
                response.status(200).send({result,message : 'OTP Sent on ' + body.to})
              }
            }
          })
        }
      }else{
        response.status(500).send({errors,message : 'Invalid Inputs'})
      }
});


module.exports = router;
