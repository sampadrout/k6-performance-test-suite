import http from 'k6/http'
import { sleep } from 'k6'
import { Counter, counter } from 'k6/metrics'

//For ex : wait for getting the response of an GET API call for 1 sec & retry the call after 1 sec. repeat this for max of 5 times
//Counter is GLOBAL

var retryCounter = new Counter("Max_Retry")

export default function () {
    retryCounter.add(1)
    for (var retryCount = 0; retryCount < 5; retryCount++) {
        const response = http.get('https://run.mocky.io/v3/e903ba9f-179f-4427-b797-5dffd2b68559')
        if (response.status != 404) {
            retryCounter.add(1)
            console.log('Response is not correct. Attempt number : ', retryCount , 'For Virtual User : ', __VU , 'For Iteration number', __ITER)
            sleep(1)
        } else {
            retryCount == 5
        }
    }
}
