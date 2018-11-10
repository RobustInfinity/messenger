var express = require('express');
var router = express.Router();

const {_} = require('../config/utils')
const {SERVICES, TYPE} = require('../config/config')


const validateSMS = function(object){

  const errors = {}
    object.to.forEach((value, index)=>{
        if(_.isEmpty(value) || value.split(' ').join('').length !== 10){
            // console.log(value.length)
            errors.to[index] = 'Not a Valid Contact Number'
        }
    })
    

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
          errors.type = 'Invalid Type'
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
       //"to" : ["an array of phone numbers"]
       var body = _.pick(request.body,['text','to','service','type'])
      //  console.log(body)
       var {isValid, errors} = validateSMS(body)
       body.to.forEach((value, index)=>{
           body.to[index] = value.split(' ').join('')
       })
       
       if(isValid){
       //   if(body.type !== TYPE.OTP){
           var SmsDbOperations = require('../db/crudOperations/sms')
           SmsDbOperations.createSMS(body,(error, result)=>{
               if(error){
                    response.json({"message":"Some Error Occured Try again Later!","code":500,"success":false});
               }else{
                   if(!result){
                       response.json({"message":"Unable To send","code":400,"success":false});
                   }else{
                       response.json({"message":"Successfully sent ","code":200,"success":true});
                   }
               }
           })
           // sendSMS(body,(error, result)=>{
           //   if(error){
           //     console.log(error)
           //     response.send({error,message : "Error Occured"})
           //   }else{
           //     if(!result){
           //       response.send({result : null,message : 'Nothing happened'})
           //     }else{
           //       console.log(result)
           //       response.status(200).send({result,message : 'Message sent successfully'})
           //     }
           //   }
           // })
       //   }else{
       //     sendOTP(body,(error, result)=>{
       //       if(error){
       //         console.log(error)
       //         response.send({error,message : "Error Occured"})
       //       }else{
       //         if(!result){
       //           response.send({result : null,message : 'Nothing happened'})
       //         }else{
       //           console.log(result)
       //           response.status(200).send({result,message : 'OTP Sent on ' + body.to})
       //         }
       //       }
       //     })
       //   }
       }else{
         response.json({"message":"Invalid parameters","code":400,"success":false,"errors":errors});
       }
});


module.exports = router;
