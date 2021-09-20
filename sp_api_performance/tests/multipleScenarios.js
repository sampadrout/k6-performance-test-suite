import { PreprodENV } from '../config/preprod_Config.js'
import { qaENV } from '../config/qa_Config.js'
import * as UpdateAddress from '../modules/updateAddress.js'
import * as searchValidJob from '../modules/searchValidJob.js'
import * as searchInvalidJob from '../modules/searchInvalidJob.js'
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
  discardResponseBodies: true,
  scenarios: {
    searchValidID: {
      executor: 'constant-vus',
      exec: 'searchValidID',
      vus: 2,
      duration: '30s',
    },
    updateAddress: {
        executor: 'constant-vus',
        exec: 'updateAddress',
        vus: 2,
        duration: '30s',
        startTime: '10s',
    },
    searchInvalidID: {
      executor: 'ramping-vus',
      exec: 'searchInvalidID',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 1 },
        { duration: '5s', target: 3 },
        { duration: '5s', target: 1 },
      ],
      gracefulRampDown: '0s',
    },
  },
  thresholds: {
    //Defining rquirements
    Response_Time_ValidSearch: ['p(95)<100', 'p(99)<200'],
    Response_Time_InvalidSearch: ['p(95)<100', 'p(99)<200'],
    Response_Time_UpdateAddress: ['p(95)<100', 'p(99)<200'],
    'http_req_failed': ['rate<0.01'], //failure rate should be less than 1%
    'http_req_waiting': ['p(95)<100', 'p(99)<200'],
    'http_req_duration{test_type:searchValidID}': ['p(95)<250', 'p(99)<350'],
    'http_req_duration{test_type:updateAddress}': ['p(99)<500'],
    'http_req_duration{scenario:invalidSearch}': ['p(99)<300'],
  }
};

export function searchValidID() {
    console.log('Valid Search',`VU: ${__VU}  -  ITER: ${__ITER}`);
    searchValidJob.searchValidJob(environment.Base_URL, environment.ServiceJobAttempt_Path, environment.CompanyId2_Value, environment.ServiceJobId2_Value)
}

export function updateAddress() {
    console.log('Update Address',`VU: ${__VU}  -  ITER: ${__ITER}`);
    UpdateAddress.updateAddress(environment.Base_URL, environment.SPAddresses_Path, environment.SpAddressID_Value, environment.CompanyId2_Value)
}

export function searchInvalidID() {
    console.log('Invalid Search',`VU: ${__VU}  -  ITER: ${__ITER}`);
    searchInvalidJob.searchInvalidJob(environment.Base_URL, environment.ServiceJobAttempt_Path, environment.CompanyId2_Value, environment.InvalidServiceJobId_Value)
}
