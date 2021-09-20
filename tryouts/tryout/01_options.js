import http from 'k6/http'

//  export let options = {
//     vus : 5,
//     duration : '5s',
//  };

export default function () {
    let response = http.get('http://qa-accel-servicepartner-ms-nlb-75715ae547cfb7e0.elb.us-east-1.amazonaws.com/servicepartner/api/latest-service-job-attempt/864/10010730');

    console.log("Get Response : ",response.status)
    console.log("Get Response : ",response.body)

}