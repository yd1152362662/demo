/*
 * @Author: yangdan
 * @Date: 2019-12-02 15:27:44
 * @LastEditors: yangdan
 * @LastEditTime: 2019-12-02 15:35:59
 * @Description: 添加描述
 */

import request from '@/utils/request';

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  });
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  });
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  });
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  });
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  });
}
