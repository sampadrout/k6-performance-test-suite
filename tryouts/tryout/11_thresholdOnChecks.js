// 1. Checks are asserts but they don't stop execution.
// 2. Asserts will fail the test & stop execution
// 3. === , it will also check datatype
// 4. check rate (in %)
// 5. __VU represents the unique number of the VU
// 6. ITER represents iteration number

import http from 'k6/http'
import {check} from 'k6'

 export let options = {
    vus : 10,
    duration : '10s',
    threasholds : {
        'checks' : ['rate>0.95']
    }
 };

export default function () {
    let response = http.get('https://run.mocky.io/v3/f8ef7fee-b662-4ad8-a4ef-443d356a93a1');

    console.log('response body length is :',response.body.length , 'for Virtual users = ', __VU , 'for iteration number :' , __ITER);

    check(response,{
        'response status is 200 :' : (r) => r.status === 200,
        'response body length is 32 :' : (r) => r.body.length == 30,
    })
}