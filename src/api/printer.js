import request from '../http/request';

export function getListPrinter(params){
    return request({
        url:'/printer/getMyHistoryPrints',
        method:'get',
        params
    });
}
export function getAllListPrinter(params){
    return request({
        url:'/printer/getAllHistoryPrints',
        method:'get',
        params
    });
}
export function getAllUserPrinter(){
    return request({
        url:'/printer/getAllUserPrinter',
        method:'get'
    });
}