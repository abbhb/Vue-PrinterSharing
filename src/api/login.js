import request from '../http/request';


export function loginApi(username,password) {
    return request({
        url:'/user/login',
        method:'post',
        data:{
            username:username,
            password:password
        }
    })
}

export function logoutApi(){
    return request({
        url: '/user/logout',
        method: 'post',
    })
}

export function checkToken(){
    return request({
        url:'/user/loginbytoken',
        method:'post',
        data:{
        }
    });
}

export function createUser(data){
    return request({
        url:'/user/create',
        method:'post',
        data:data
    });
}

export function getUserList(params){
    return request({
        url:'/user/get',
        method:'get',
        params
    });
}

export function getNavListForAdmin(params){
    return request({
        url:'/quicknavigation/listadmin',
        method:'get',
        params
    });
}

export function delUserList(params){
    return request({
        url:'/user/delete',
        method:'delete',
        params
    });
}

export function deleteNavigationCategorize(params){
    return request({
        url:'/quicknavigation/delete',
        method:'delete',
        params
    });
}


// 文件上传
export function postUploadForPDF (file,numberOfPrintedPages,printingDirection,printBigValue,numberOfPrintedPagesIndex) {
    return request({
        url: '/printer/uploadpdf?numberOfPrintedPages='+numberOfPrintedPages+'&printingDirection='+printingDirection+'&printBigValue='+printBigValue+'&numberOfPrintedPagesIndex='+numberOfPrintedPagesIndex,
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
export function postUploadForWord (file,numberOfPrintedPages,printingDirection) {
    return request({
        url: '/printer/uploadword?numberOfPrintedPages='+numberOfPrintedPages+'&printingDirection='+printingDirection,
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export function updataforuser(data){
    return request({
        url:'/user/updataforuser',
        method:'put',
        data
    });
}
export function updataforquicknavigationcategorize(data){
    return request({
        url:'/quicknavigation/updataforquicknavigationcategorize',
        method:'put',
        data
    });
}


export function updatauserstatus(data){
    return request({
        url:'/user/updatauserstatus',
        method:'put',
        data
    });
}

export function changePassWord(id,username,password,newpassword,checknewpassword){
    return request({
        url:'/user/changepassword',
        method:'put',
        data:{
            id:String(id),
            username:String(username),
            password:String(password),
            newpassword:String(newpassword),
            checknewpassword:String(checknewpassword)
        }
    });
}