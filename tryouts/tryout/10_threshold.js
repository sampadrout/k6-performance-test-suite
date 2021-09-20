//Threshold define Pass/Fail criteria for tests

//For ex:
//1. System doen't produce more than 1% of errors
//2. Response time for 95% of API's should be less than 100 ms
//3. Response time for 99% of API's should be less than 200 ms

import http from 'k6/http'
import { Rate } from 'k6/metrics'

//Declaring Rate var
const failureRate = new Rate("Threshold-Rate_For_Failed_Requests")


export let options = {
    thresholds: {
        //Defining rquirements
        'failed requests' : ['rate<0.01'],
        'http_req_duration': ['p(95)<100' ,'p(99)<200'],
    }
}

export default function () {
    //Capturing the response
    let response = http.get('https://run.mocky.io/v3/f8ef7fee-b662-4ad8-a4ef-443d356a93a1');

    //Applying the thresholds
    failureRate.add(response.status != 200) //If response is not 200 then it'll be added in failureRate

}