import requestfordoc from '../http/requestfordoc';

export function docsadd(title,content,proj_id) {
  return requestfordoc({
    url:'/docs/add',
    method:'post',
    data:{
      title:title,
      content:content,
      proj_id:proj_id
    }
  })
}