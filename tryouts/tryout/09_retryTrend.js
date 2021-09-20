import http from 'k6/http'
import { sleep } from 'k6'
import { Counter, Trend } from 'k6/metrics'

var retryCounter = new Counter("Max_Retry")
var retryTrend = new Trend("Retry_TREND")

export default function () {

    var maxAttempts = 5
    retryCounter.add(1)
    for (var retryCount = 0; retryCount < 5; retryCount++) {
        var numberOfAttempts = maxAttempts - retryCount + 1
        retryTrend.add(numberOfAttempts)
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
