import { PreprodENV } from '../config/preprod_Config.js'
import { qaENV } from '../config/qa_Config.js'
import { GlobalOptions } from '../config/global_Config.js'
import * as searchInvalidJob from '../modules/searchInvalidJob.js'

let environment;
if (__ENV.environment == 'preprod') {
    environment = PreprodENV
} else {
    environment = qaENV
}

export let options = {
    vus: GlobalOptions.VUS,
    duration: GlobalOptions.DURATION,
    thresholds: {
        //Defining rquirements
        'http_req_duration': ['p(95)<100' ,'p(99)<200'],
    }
};

export default function () {
    console.log('__ENV',__ENV.environment)

    try {
        searchInvalidJob.searchInvalidJob(environment.Base_URL, environment.ServiceJobAttempt_Path, environment.CompanyId2_Value, environment.InvalidServiceJobId_Value)
    }
    catch (exception) {
        console.log('Exception : ', exception)
    }

}