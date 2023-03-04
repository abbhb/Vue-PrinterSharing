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

// 文件上传
export function postUploadForPDF (file,numberOfPrintedPages,printingDirection) {
    return request({
        url: '/printer/uploadpdf?numberOfPrintedPages='+numberOfPrintedPages+'&printingDirection='+printingDirection,
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


export function updataforuser(id,username,name,sex,idNumber,phone){
    return request({
        url:'/user/updataforuser',
        method:'post',
        data:{
            id:String(id),
            username:String(username),
            name:String(name),
            sex:String(sex),
            idNumber:String(idNumber),
            phone:String(phone)
        }
    });
}

export function changePassWord(id,username,password,newpassword,checknewpassword){
    return request({
        url:'/user/changepassword',
        method:'post',
        data:{
            id:String(id),
            username:String(username),
            password:String(password),
            newpassword:String(newpassword),
            checknewpassword:String(checknewpassword)
        }
    });
}