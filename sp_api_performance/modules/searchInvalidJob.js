import http from 'k6/http'
import { check } from 'k6'
import { Rate , Trend} from 'k6/metrics'
import * as urlBuilder from '../utilities/urlBuilder.js'

export let errorRate = new Rate('Assert Errors') 
var getAPITrend_InvalidSearch = new Trend("GET_API_TREND_DURATION_InvalidSearch")   
var getAPITrendWaiting_InvalidSearch = new Trend("GET_API_TREND_WAITING_InvalidSearch") 

export function searchInvalidJob(endpoint, ServiceJobAttempt_Path, CompanyId2_Value, InvalidServiceJobId_Value) {
    let getResponse = http.get(urlBuilder.buildJobSearchURL(endpoint, ServiceJobAttempt_Path, CompanyId2_Value, InvalidServiceJobId_Value))
    //Invalid Search
    const check1 = check(getResponse, 
        {'Response status for Invalid search is 404 ': (r) => r.status == 404},
        { my_tag: "Tag : Search Invalid Job ID" },
  );

    //Adding Rate
    //It's boolean 
    errorRate.add(!check1); 

    //Adding a trend for Invalid Search
    getAPITrend_InvalidSearch.add(getResponse.timings.duration, { my_tag: "Tag : Search Invalid Job ID" })
    getAPITrendWaiting_InvalidSearch.add(getResponse.timings.waiting, { my_tag: "Tag : Search Invalid Job ID" })

}