import { PreprodENV } from '../config/preprod_Config.js'
import { qaENV } from '../config/qa_Config.js'
import { GlobalOptions } from '../config/global_Config.js'
import * as UpdateAddress from '../modules/updateAddress.js'

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
        console.log("Inside updateAddress")
        console.log("Endpoint url : ", environment.Base_URL)
        console.log("SpAddressPath : ", environment.SPAddresses_Path)
        console.log("SpAddressID : ", environment.SpAddressID_Value)
        UpdateAddress.updateAddress(environment.Base_URL, environment.SPAddresses_Path, environment.SpAddressID_Value, environment.CompanyId2_Value)
    }
    catch (exception) {
        console.log('Exception : ', exception)
    }

}