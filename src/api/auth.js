import request from '../http/request';


export function redirectEN(code) {
    return request({
        url:'/redirect/en',
        method:'get',
        params:{
            code:code
        }
    })
}
export function firstEN(data) {
    return request({
        url:'/redirect/firsten',
        method:'post',
        data
    })
}