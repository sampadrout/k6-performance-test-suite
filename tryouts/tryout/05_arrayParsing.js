//Parsing JSON Array
//This is the reference mock API : https://run.mocky.io/v3/a2cf4018-c5a9-41b2-9338-fdd503e201e0

import http from 'k6/http'
import {check} from 'k6'


export default function () {
    var url = 'https://run.mocky.io/v3/a2cf4018-c5a9-41b2-9338-fdd503e201e0';

    var headerParam = {
        headers:{
            'Content-Type' : 'application/json',
        }
    }

    let response = http.get(url, headerParam)
    console.log('response body is :',response.body, 'for Virtual users = ', __VU , 'for iteration number :' , __ITER);

    //Parsing the body
    let body = JSON.parse(response.body)
    body.employees.forEach(element => {
        console.log('name is :', element.name)
    })

    //Applying checks
    const check1 = check(response,{
        'whether response status is 200 ' : (r) => r.status === 200,
        'whether Message is success ' : (r) => JSON.parse(r.body).Message === "API returns some response",
    })
    
}