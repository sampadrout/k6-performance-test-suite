import http from 'k6/http'
import {check} from 'k6'
//Mock API fro this js file : https://run.mocky.io/v3/fe5ca224-df8a-4da2-a966-daf172321eff
//Body : "Message" : "API returns some response"


export default function () {
    var url = 'https://run.mocky.io/v3/fe5ca224-df8a-4da2-a966-daf172321eff';

    var headerParam = {
        headers:{
            'Content-Type' : 'application/json',
        }
    }

    const response = http.get(url, headerParam)
    console.log('response body is :',response.body, 'for Virtual users = ', __VU , 'for iteration number :' , __ITER);

    //Parsing the body
    let body = JSON.parse(response.body)
    console.log('Parsed response body object:',body)
    console.log('Parsed response body in String: ',JSON.stringify(body))
    console.log('Response message is :',body.Message)

    //Applying checks
    const check1 = check(response,{
        'whether response status is 200 ' : (r) => r.status === 200,
        'whether Message is success ' : (r) => JSON.parse(r.body).Message === "API returns some response",
    })
    
}