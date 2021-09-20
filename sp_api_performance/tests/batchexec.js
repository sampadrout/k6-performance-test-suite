import http from 'k6/http';
import { check } from 'k6';
import { PreprodENV } from '../config/preprod_Config.js'
import { qaENV } from '../config/qa_Config.js'
import { GlobalOptions } from '../config/global_Config.js'
import * as urlBuilder from '../utilities/urlBuilder.js'
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
      stages: [
        { duration: Number(GlobalOptions.DURATION)+'s', target: Number(GlobalOptions.VUS) },
        { duration: Number(GlobalOptions.DURATION)+10+'s', target: Number(GlobalOptions.VUS)+2 },
        { duration: Number(GlobalOptions.DURATION)+15+'s', target: Number(GlobalOptions.VUS)+5 },
      ],
    thresholds: {
        //Defining rquirements
        Response_Time_ValidSearch: ['p(95)<100', 'p(99)<200'],
        Response_Time_InvalidSearch: ['p(95)<100', 'p(99)<200'],
        Response_Time_UpdateAddress: ['p(95)<100', 'p(99)<200'],
        'http_req_failed': ['rate<0.01'], //failure rate should be less than 1%
        'http_req_waiting': ['p(95)<100', 'p(99)<200']
    },
    batch: 15, //Default = 20
    batchPerHost: 5
};

export default function () {
    let req1 = {
        method: 'GET',
        url: urlBuilder.buildJobSearchURL(environment.Base_URL, environment.ServiceJobAttempt_Path, environment.CompanyId2_Value, environment.ServiceJobId2_Value),
    };
    let req2 = {
        method: 'GET',
        url: urlBuilder.buildJobSearchURL(environment.Base_URL, environment.ServiceJobAttempt_Path, environment.CompanyId2_Value, environment.InvalidServiceJobId_Value),
    };
    let responses = http.batch([req1, req2]);

    console.log(`VU: ${__VU}  -  ITER: ${__ITER}`);

    //Applying checks
    const check1 = check(responses[0], {
        'Response status is 200 : ': (r) => r.status === 200,
    })
    const check2 = check(responses[1], {
        'Response status is 404 : ': (r) => r.status == 404,
    })
}
