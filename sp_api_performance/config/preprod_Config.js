//Specify environment specific details...
//Preprod Environment
var SP_BaseURL_Preprod = "http://preprod-accel-sp-ms-nlb-0800513de191f9ab.elb.us-east-1.amazonaws.com/servicepartner"
var ServiceJobAttempt_Path_Preprod = "/api/latest-service-job-attempt"
var CompanyId2_Value_Preprod = "357"
var ServiceJobId2_Value_Preprod = "10005968"
var InvalidServiceJobId_Value_Preprod = "0"
var AccountNumber = "700001166"
var Mobile = "9098098097"
var PrimaryEmailAddress = "Camila.Pollich@gmail.com"
var ServiceJobStatusCode = "REA"
var ServiceAttemptId = "10007498"
var SPAddresses_Path="/api/sp-addresses"
var SpAddressID_Value = "601"
var SpInvAddressID_Value = "0"

//Export PREPROD environment details
export let PreprodENV = {
    Base_URL : SP_BaseURL_Preprod,
    ServiceJobAttempt_Path : ServiceJobAttempt_Path_Preprod,
    CompanyId2_Value : CompanyId2_Value_Preprod,
    ServiceJobId2_Value : ServiceJobId2_Value_Preprod,
    InvalidServiceJobId_Value : InvalidServiceJobId_Value_Preprod,
    AccountNumber : AccountNumber,
    Mobile : Mobile,
    PrimaryEmailAddress : PrimaryEmailAddress,
    ServiceJobStatusCode : ServiceJobStatusCode,
    ServiceAttemptId : ServiceAttemptId,
    SPAddresses_Path : SPAddresses_Path,
    SpAddressID_Value : SpAddressID_Value,
    SpInvAddressID_Value : SpInvAddressID_Value

}