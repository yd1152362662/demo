/*
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-23 16:28:06
 * @Description: 添加描述
 */
import axios from 'axios';
import { Message } from 'element-ui';

// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
console.log('process.env.VUE_APP_BASE_API', process.env.VUE_APP_BASE_API);
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    //  加上token
    // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   config.headers.Authorization = `token ${store.state.token}`;
    // }
    console.log(config);
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    console.log('resTEST', res);

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 200) {
    if (!res) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
    // } else {
    //
    // }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
