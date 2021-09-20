import http from 'k6/http'
import {check} from 'k6'
import {Rate} from 'k6/metrics'
//To specify the threshold or failure rate.
//Failure rate can be measured using checks

export let errorRate = new Rate('errors')

 export let options = {
    thresholds : {
        errors : ['rate<0.1'] // Error rate should be less than 10%
    }
 };

export default function () {
   // let response = http.get('https://run.mocky.io/v3/e903ba9f-179f-4427-b797-5dffd2b68559');
    let response = http.get('https://run.mocky.io/v3/f8ef7fee-b662-4ad8-a4ef-443d356a93a1');

    console.log('response body length is :',response.body.length , 'for Virtual users = ', __VU , 'for iteration number :' , __ITER);

   const check1 = check(response,{
        'response status is 200 :' : (r) => r.status === 200,
    })

    const check2 = check(response,{
        'response body length is 32 :' : (r) => r.body.length == 30,
    })

    errorRate.add(!check1); //It's boolean (not 200 & not 32)
    errorRate.add(!check2);
}