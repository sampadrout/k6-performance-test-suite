//Build URL's
export const buildUpdateAddressURL = (endpoint, SpAddressPath) => {
    return endpoint + SpAddressPath
}

export const buildJobSearchURL = (endpoint, ServiceJobAttempt_Path, CompanyId2_Value, ServiceJobId2_Value) => {
    return endpoint + ServiceJobAttempt_Path + '/' + CompanyId2_Value + '/' + ServiceJobId2_Value
}