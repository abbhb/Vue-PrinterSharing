import request from '../http/request';

export function getListPrinter(params){
    return request({
        url:'/printer/getMyHistoryPrints',
        method:'get',
        params
    });
}