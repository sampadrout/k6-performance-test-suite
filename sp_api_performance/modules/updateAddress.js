import http from 'k6/http'
import { check } from 'k6'
import { Rate, Trend } from 'k6/metrics'
import * as requestBuilder from '../utilities/requestBuilder.js'
import * as headerBuilder from '../utilities/headerBuilder.js'
import * as urlBuilder from '../utilities/urlBuilder.js'

export let errorRate = new Rate('Failure Rate')
var putAPITrend_UpdateAddress = new Trend("GET_API_TREND_DURATION_UpdateAddress")
var getAPITrendWaiting_UpdateAddress = new Trend("GET_API_TREND_WAITING_UpdateAddress")

export function updateAddress(endpoint, SpAddressPath, SpAddressID, CompanyID) {
    
    let putResponse = http.put(urlBuilder.buildUpdateAddressURL(endpoint, SpAddressPath), JSON.stringify(requestBuilder.updateAddressRequestBody(SpAddressID, CompanyID)), {headers : headerBuilder.setUpdateAddressHeader})

    //Adding a check
    console.log("putResponse.status : ", putResponse.status)
    var checkPutResponse = check(putResponse, {
        'Update Address status is 200 ': (r) => r.status === 200,
    })

    // console.log('SP Address ID is',JSON.parse(putResponse.body).spAddressId)
    // var checkAddressID = check(putResponse, {
    //     'SP Address ID validation success ': (r) => JSON.parse(putResponse.body).spAddressId == SpAddressID,
    // })

    //Define error rate
    errorRate.add(!checkPutResponse)
    // errorRate.add(!checkAddressID)

    //Adding a trend
    putAPITrend_UpdateAddress.add(putResponse.timings.duration)
    getAPITrendWaiting_UpdateAddress.add(putResponse.timings.waiting)




}


