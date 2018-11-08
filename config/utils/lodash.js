
module.exports = {
    pick : function(object, keys){
        var newObject = {}
        
        if(keys.length > 0 && object !== undefined){
            keys.forEach((key)=>{
               newObject[key] = object[key] !== undefined ? object[key] : undefined
            })
        }
        return newObject
    },

    isEmpty : function(value){
        return value === undefined || value === null || 
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && Object.keys(value).length === 0)
    }
}