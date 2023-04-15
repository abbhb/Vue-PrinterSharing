import axios from 'axios';
import { indexfordoc } from './indexfordoc';
// import Config from '../config';
// import AjaxUploader from "ant-design-vue/es/vc-upload/src/AjaxUploader";


const serviceforrequest = axios.create({
  baseURL: "./doc/api/v1/", // api的base_url
  timeout: 120000 // 请求超时时间
});

indexfordoc(serviceforrequest);

export default serviceforrequest;