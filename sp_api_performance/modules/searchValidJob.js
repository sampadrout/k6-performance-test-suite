import http from 'k6/http'
import { check } from 'k6'
import { Rate , Trend} from 'k6/metrics'
import * as urlBuilder from '../utilities/urlBuilder.js'

export let errorRate = new Rate('Assert Errors') 
var getAPITrend_ValidSearch = new Trend("GET_API_TREND_DURATION_VvalidSearch")   
var getAPITrendWaiting_ValidSearch = new Trend("GET_API_TREND_WAITING_ValidSearch")

export function searchValidJob(endpoint, ServiceJobAttempt_Path, CompanyId2_Value, ServiceJobId2_Value) {

    let getResponse = http.get(urlBuilder.buildJobSearchURL(endpoint, ServiceJobAttempt_Path, CompanyId2_Value, ServiceJobId2_Value))
    console.log('Response time was ' + String(getResponse.timings.duration) + ' ms');
    //Applying checks
    const check1 = check(getResponse, {
        'Response status for Valid search is 200 ': (r) => r.status === 200,
    })
    // const check2 = check(getResponse, {
    //     'Account Number is validated': (r) => JSON.parse(r.body).accountNumber == environment.AccountNumber
    // })
    // const check3 = check(getResponse, {
    //     'Service Job ID is validated': (r) => JSON.parse(r.body).serviceJobId == environment.ServiceJobId2_Value,
    // })
    // const check4 = check(getResponse, {
    //     'Mobile is  validated': (r) => JSON.parse(r.body).mobile == environment.Mobile,
    // })
    // const check5 = check(getResponse, {
    //     'Primary Email Address validated': (r) => JSON.parse(r.body).primaryEmailAddress == environment.PrimaryEmailAddress,
    // })
    // const check6 = check(getResponse, {
    //     'Service Job Status Code Validated': (r) => JSON.parse(r.body).serviceJobStatusCode == environment.ServiceJobStatusCode,
    // })
    // const check7 = check(getResponse, {
    //     'Service Attempt Id validated': (r) => JSON.parse(r.body).serviceAttemptId == environment.ServiceAttemptId,
    // })

    //Adding Rate
    //It's boolean
    errorRate.add(!(check1));
    // errorRate.add(!(check1 && check2 && check3 && check4 && check5 && check6 && check7));

    //Adding a trend for valid Search
    getAPITrend_ValidSearch.add(getResponse.timings.duration)
    getAPITrendWaiting_ValidSearch.add(getResponse.timings.waiting)

}