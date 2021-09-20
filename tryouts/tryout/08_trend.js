import http from 'k6/http'
import { check } from 'k6'
import { Rate } from 'k6/metrics'
import { Trend } from 'k6/metrics' 
//It provides cumulative api duration for each & every inividual API calls
//It can be used to measure the duration of each API. 
//Whereas http_req-duration meausres cumulative duration of all API calls

//define API Trend
var getAPITrend = new Trend("GET_API_TREND_DURATION")   
var getAPITrendWaiting = new Trend("GET_API_TREND_WAITING") 

var getAPITrend1 = new Trend("GET_API_TREND_DURATION_1") 
var getAPITrendWaiting1 = new Trend("GET_API_TREND_WAITING_1")

export default function () {
    let response = http.get('https://run.mocky.io/v3/f8ef7fee-b662-4ad8-a4ef-443d356a93a1');
    const response1 = http.get('https://run.mocky.io/v3/f8ef7fee-b662-4ad8-a4ef-443d356a93a1');

    //Adding a trend
    getAPITrend.add(response.timings.duration)
    getAPITrendWaiting.add(response.timings.waiting)

    getAPITrend1.add(response1.timings.duration)
    getAPITrendWaiting1.add(response1.timings.waiting)

}