//Build Request Body for 
export const updateAddressRequestBody = (spAddressId, companyId) => {
    return {
        "spAddressId": spAddressId,
        "companySiteId": null,
        "spAddressTypeId": 1,
        "address1": "Boca Raton Street",
        "address2": null,
        "address3": null,
        "city": "Boca Raton",
        "state": "New york",
        "zip": "33431",
        "zip4": "1234",
        "countyCode": 10,
        "country": 1,
        "status": 1,
        "updatedBy": "API_Automation_Test",
        "updatedOn": "2021-07-12T07:51:43.417Z",
        "createdBy": "API_Automation_Test",
        "createdOn": "2021-07-12T07:51:43.417Z",
        "companyId": companyId,
        "spContactId": null
    }
}