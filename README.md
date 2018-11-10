# messenger
A messaging service built on msg91 and Twilio

body = {
  "to" : {'required'}
  "type" : promotional, transactional,OTP {'required' only when service : 'msg91'}  //because twilio doesn't have any promotional/transactional 
  "service" : msg91, Twilio {default : 'msg91'}
  "body" : {Not required for 'type' : 'OTP', otherwise manually-typed messages}  //no template for promotional and transactional (can be attached)
}

"/contact/send-sms"  //for sending any 'type' of message
