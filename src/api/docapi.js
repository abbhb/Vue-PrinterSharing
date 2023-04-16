import requestfordoc from '../http/requestfordoc';


// doc接口整合下，方面独立成项目,首先不要写代码，得先更新，不然白写

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