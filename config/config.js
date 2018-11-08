
//env constants
module.exports = {
    SERVICES : {
        TWILIO : 'twilio',
        MSG91 : 'msg91'
    },
    TWILIO : {
        AUTH_TOKEN : 'e9df2bb28db3d6b8b257920768fb2a9f',
        ACCOUNT_SID : 'AC6c66bd7fdb3305f7cc54a681905ffbfc',
        MY_NUMBER : '+13152846061'
    },
    MSG91 : {
        API_KEY :'246455AZYeXWiILcl5be1b10f',
        SENDER_ID : 'DEVOPS',
        ROUTE_ID :{
            PROMOTIONAL : 1,
            TRANSACTIONAL : 4
        }
    },
    EXPIRES_IN : 10,
    TYPE : {
        PROMOTIONAL : 'promotional',
        TRANSACTIONAL : 'transactional',
        OTP : 'OTP'
    }
}