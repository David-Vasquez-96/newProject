import axios from 'axios'

export default axios.create({
    // baseUrl:"https://www.google.com/",
    headers:{
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
    }
})