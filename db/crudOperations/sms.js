
const SMS = require('../models/SMS')
const {prepareSMS,sendSMS} = require('../../config')



const dbOperations = {
    createSMS : function (messageObj, callback){
    
        var messages = []
        messageObj.to.forEach((value)=>{
            messages.push(prepareSMS(value,messageObj.text,messageObj.type,messageObj.service))
        })
        messages.forEach((message)=>{
            sendSMS(message)
        })

        SMS.insertMany(messages,(error, result)=>{
            
            if(error){
                callback(error, null)
            }else{
                if(!result){
                    callback(null, null)
                }else{
                    callback(null, result)
                }
            }
        })
       
    },
    getSMS : function(callback){
        SMS.find((error, result)=>{
            if(error){
                callback(error, null)
            }else{
                if(!result){
                    callback(null, null)
                }else{
                    callback(null, result)
                }
            }
        })
    }
}

module.exports = dbOperations