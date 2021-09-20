import http from 'k6/http'

export let options = {
    stages: [
        { duration: '20s', target: 20 },
        { duration: '10s', target: 10 }
    ]
}

export default function () {
    http.get('https://run.mocky.io/v3/e903ba9f-179f-4427-b797-5dffd2b68559');
}