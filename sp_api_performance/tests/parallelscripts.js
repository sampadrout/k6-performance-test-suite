import { PreprodENV } from '../config/preprod_Config.js'
import { qaENV } from '../config/qa_Config.js'
import { GlobalOptions } from '../config/global_Config.js'
import * as searchInvalidJob from '../modules/searchInvalidJob.js'
import * as searchValidJob from '../modules/searchValidJob.js'
import * as updateAddress from '../modules/updateAddress.js'
import { group } from 'k6';
import { Rate, Trend } from 'k6/metrics'

//Define the environent
let environment;
if (__ENV.environment == 'preprod') {
  environment = PreprodENV
} else {
  environment = qaENV
}

//Defining Trends & Rate
export let errorRate = new Rate('Assert Errors')
var getAPITrend_ValidSearch = new Trend("Response_Time_ValidSearch")
var getAPITrendWaiting_ValidSearch = new Trend("Waiting_Time_ValidSearch")
var getAPITrend_InvalidSearch = new Trend("Response_Time_InvalidSearch")   
var getAPITrendWaiting_InvalidSearch = new Trend("Waiting_Time_InvalidSearch") 
var putAPITrend_UpdateAddress = new Trend("Response_Time_UpdateAddress")
var getAPITrendWaiting_UpdateAddress = new Trend("Waiting_Time_UpdateAddress")

export let options = {
  thresholds: {
    //Defining rquirements
    Response_Time_ValidSearch: ['p(95)<100', 'p(99)<200'],
    Response_Time_InvalidSearch: ['p(95)<100', 'p(99)<200'],
    Response_Time_UpdateAddress: ['p(95)<100', 'p(99)<200'],
    'http_req_failed': ['rate<0.01'], //failure rate should be less than 1%
    'http_req_waiting': ['p(95)<100', 'p(99)<200']
  }
};

export default function () {
    group('search Invalid Job ID', function () {
        searchInvalidJob.searchInvalidJob(environment.Base_URL, environment.ServiceJobAttempt_Path, environment.CompanyId2_Value, environment.InvalidServiceJobId_Value)
    });

    group('search Valid Job ID', function () {
        searchValidJob.searchValidJob(environment.Base_URL, environment.ServiceJobAttempt_Path, environment.CompanyId2_Value, environment.ServiceJobId2_Value)
    });

    group('Update address of a company', function () {
        updateAddress.updateAddress(environment.Base_URL, environment.SPAddresses_Path, environment.SpAddressID_Value, environment.CompanyId2_Value)
    });
}
