import http from 'k6/http'
import {Counter, counter} from 'k6/metrics'

var myCounter = new Counter("My Counter")

export default function () {
    myCounter.add(1)
    myCounter.add(2)
}