import searchValidJob_Test  from "./tests/searchValidJob_Test.js";
import searchInvalidJob_Test  from "./tests/searchInvalidJob_Test.js";
import updateAddress_Test from "./tests/updateAddress_Test.js";
import {GlobalOptions} from './config/global_Config.js'
import { PreprodENV } from './config/preprod_Config.js'
import { qaENV } from './config/qa_Config.js'

let environment;
if (__ENV.environment == 'preprod') {
    environment = PreprodENV
} else {
    environment = qaENV
}

export let options = {
    stages: [
        { duration: Number(GlobalOptions.DURATION)+'s', target: Number(GlobalOptions.VUS) },
        { duration: Number(GlobalOptions.DURATION)+10+'s', target: Number(GlobalOptions.VUS)+2 },
    ]
};

export default function () {
    searchValidJob_Test()
    searchInvalidJob_Test()
    updateAddress_Test()
}