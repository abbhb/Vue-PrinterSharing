import request from '../http/request';



//此api由之前login升级为cas登录
export function loginApi(st) {
    return request({
        url:'/user/login',
        method:'post',
        data:{
            st:st
        }
    })
}


export function redirectEN(code) {
    return request({
        url:'/redirect/en',
        method:'get',
        params:{
            code:code
        }
    })
}
export function redirectGitee(code) {
    return request({
        url:'/redirect/gitee',
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
export function firstGitee(data) {
    return request({
        url:'/redirect/firstgitee',
        method:'post',
        data
    })
}