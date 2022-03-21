import axios from './instance'

function post (url, data, error) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res)
        }, err => {
            err = error ? error : err
            // Toast({
            //     message: err,
            //     duration: 500
            // })
        })
    })
}
function get (url, data, error) {
    return new Promise((resolve, reject) => {
        axios.get(url, data).then(res => {
            resolve(res)
        }, err => {
            err = error ? error : err
            // Toast({
            //     message: err,
            //     duration: 500
            // })
        })
    })
}
export default {get,post}