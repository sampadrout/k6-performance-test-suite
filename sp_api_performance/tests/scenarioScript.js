import { PreprodENV } from '../config/preprod_Config.js'
import { qaENV } from '../config/qa_Config.js'
import { GlobalOptions } from '../config/global_Config.js'
import * as searchValidJob from '../modules/searchValidJob.js'
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

export let options = {
  scenarios: {
    constantItr_scenario: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 20,
      maxVUs: 300,
  }
},
  thresholds: {
    //Defining rquirements
    Response_Time_ValidSearch: ['p(95)<100', 'p(99)<200'],
    'http_req_failed': ['rate<0.01'], //failure rate should be less than 1%
    'http_req_waiting': ['p(95)<100', 'p(99)<200']
  }
};


export default function () {
  console.log(`VU: ${__VU}  -  ITER: ${__ITER}`);
  searchValidJob.searchValidJob(environment.Base_URL, environment.ServiceJobAttempt_Path, environment.CompanyId2_Value, environment.ServiceJobId2_Value)
}
