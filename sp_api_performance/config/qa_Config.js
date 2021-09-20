//Specify environment specific details...
var SP_BaseURL_QA = "http://qa-accel-servicepartner-ms-nlb-75715ae547cfb7e0.elb.us-east-1.amazonaws.com/servicepartner"
var ServiceJobAttempt_Path_QA = "/api/latest-service-job-attempt"
var CompanyId2_Value_QA = "864"
var ServiceJobId2_Value_QA = "10010730"
var InvalidServiceJobId_Value_QA = "0"
var AccountNumber = "700001166"
var Mobile = "9098098097"
var PrimaryEmailAddress = "Bethel_Lesch@gmail.com"
var ServiceJobStatusCode = "EXP"
var ServiceAttemptId = "10012280"
var SPAddresses_Path="/api/sp-addresses"
var SpAddressID_Value = "601"
var SpInvAddressID_Value = "0"


//Export QA environment details
export let qaENV = {
    Base_URL : SP_BaseURL_QA,
    ServiceJobAttempt_Path : ServiceJobAttempt_Path_QA,
    CompanyId2_Value : CompanyId2_Value_QA,
    ServiceJobId2_Value : ServiceJobId2_Value_QA,
    InvalidServiceJobId_Value : InvalidServiceJobId_Value_QA,
    AccountNumber : AccountNumber,
    Mobile : Mobile,
    PrimaryEmailAddress : PrimaryEmailAddress,
    ServiceJobStatusCode : ServiceJobStatusCode,
    ServiceAttemptId : ServiceAttemptId,
    SPAddresses_Path : SPAddresses_Path,
    SpAddressID_Value : SpAddressID_Value,
    SpInvAddressID_Value : SpInvAddressID_Value
}
