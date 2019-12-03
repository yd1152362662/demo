/*
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-12-03 09:05:16
 * @Description: 添加描述
 */
import request from '@/utils/request';

// const request = require('@/utils/request')
// const request1 = require('@/utils/request1')
// const requestTest = require('@/utils/requestTest')

// import request1 from '@/utils/request1';

import requestTest from '@/utils/requestTest'

export function login(data) {
  console.log('data', data);
  return request1.NetPost('/login', data, 'userLogin');
}

export function getVerificationCode(data) {
  console.log('data', data);
  return requestTest({
    url: '/user/info',
    method: 'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
