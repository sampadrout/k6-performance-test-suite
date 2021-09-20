import http from 'k6/http'

export default function () {
    var url = 'https://run.mocky.io/v3/e903ba9f-179f-4427-b797-5dffd2b68559'

    var param = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    var payload = JSON.stringify({
        email : 'abc@gmail.com',
        password : 'adafsddag'
    })

    //pass url, header, body
    let response = http.post(url, param, payload)
}