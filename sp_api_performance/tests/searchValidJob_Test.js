import { PreprodENV } from '../config/preprod_Config.js'
import { qaENV } from '../config/qa_Config.js'
import { GlobalOptions } from '../config/global_Config.js'
import * as searchValidJob from '../modules/searchValidJob.js'

let environment;
if (__ENV.environment == 'preprod') {
    environment = PreprodENV
} else {
    environment = qaENV
}

export let options = {
    vus: GlobalOptions.VUS,
    duration: Number(GlobalOptions.DURATION)+'s',
    thresholds: {
        //Defining rquirements
        'http_req_duration': ['p(95)<100' ,'p(99)<200'],
    }
};

export default function () {

    try {
        console.log("Base_URL :",environment.Base_URL)
        console.log("ServiceJobAttempt_Path :",environment.ServiceJobAttempt_Path)
        console.log("CompanyId2_Value :",environment.CompanyId2_Value)
        console.log("ServiceJobId2_Value :",environment.ServiceJobId2_Value)
        searchValidJob.searchValidJob(environment.Base_URL, environment.ServiceJobAttempt_Path, environment.CompanyId2_Value, environment.ServiceJobId2_Value)
    }
    catch (exception) {
        console.log('Exception : ', exception)
    }

}