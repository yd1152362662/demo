/*
 * @Author: yangdan
 * @Date: 2019-09-24 10:35:10
 * @LastEditors: yangdan
 * @LastEditTime: 2019-10-23 12:47:11
 * @Description: 添加描述
 */
import axios from 'axios';
import NodeRSA from 'node-rsa';
const Base64 = require('js-base64').Base64;
var CryptoJS = require('crypto-js');
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.withCredentials = false;

var FantuAxios = axios.create({
  baseURL: 'https://test.fantudl.com/fantulogistics'
});
// 请求开始
FantuAxios.interceptors.request.use(
  function(config, a, b) {
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);
// 请求结束
FantuAxios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    console.log('response1', response);
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);

const encryptmodel = 0;

const appID = 1;
const aseKey = '0DF0236A1827E181';
const rsaKeyPublic =
  '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAqSPVc2s42kcMS8Tc5uwoaYeK\n' +
  'AtSn1I1uHznC9Y1oqLsgkhMDFawqopAvyMArufCSWmrLxhxi/8q5I/XqYBML2WDg\n' +
  'S1cr4SF98Soe9hjIqES4iTVROWgF+ptv3J2aWvIFQvfWGmJkx2tygeAKCizacMiN\n' +
  'dse70XA1ZoPjlO1xoQIDAQAB\n' +
  '-----END PUBLIC KEY-----';

var rsaPublic = new NodeRSA(rsaKeyPublic, 'pkcs8-public-pem');
rsaPublic.setOptions({ encryptionScheme: 'pkcs1' });

function FantuMD5(data) {
  return String(CryptoJS.MD5(data, { asString: true }));
}

function AesEncrypt(data, iv) {
  // 加密
  var keyUtf8 = CryptoJS.enc.Utf8.parse(aseKey);
  var ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data, keyUtf8, {
    iv: ivUtf8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString(); // 返回的是base64格式的密文
}

function AesDecrypt(dataEncrypted, iv) {
  // 解密
  var keyUtf8 = CryptoJS.enc.Utf8.parse(aseKey);
  var ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(dataEncrypted, keyUtf8, {
    iv: ivUtf8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function RsaEncrypt(data) {
  return rsaPublic.encrypt(data, 'base64');
}

async function NetPost(url, data, method) {
  var jsonObject = Object.create(null);
  jsonObject.appID = appID;
  var iv = CryptoJS.lib.WordArray.random(8).toString(CryptoJS.enc.Hex);
  jsonObject.key = RsaEncrypt(iv);
  jsonObject.timeStamp = Date.parse(new Date());
  //  如果method存在就是method否则就是''
  method || '';
  jsonObject.method = method;

  if (encryptmodel === 1) {
    jsonObject.param = AesEncrypt(data, iv);
  } else {
    jsonObject.param = data;
  }
  jsonObject.sign = FantuMD5(
    jsonObject.appID + '&' + jsonObject.timeStamp + '&' + data
  );

  var jsonData = JSON.stringify(jsonObject);
  var postRes = null;
  await FantuAxios.post(url, jsonData)
    .then(res => {
      postRes = res.data;
    })
    .catch(err => {
      // console.log(err)
    });

  if (postRes !== null) {
    var deCryptedData = JSON.stringify(postRes);
    var jsonResObject = JSON.parse(deCryptedData);
    var jsonRes = jsonResObject.res;
    jsonRes = JSON.parse(jsonRes);
    return jsonRes;
  }

  return null;
}

function NetGet(url, data, callback) {
  FantuAxios.get(url, data)
    .then(res => {
      // console.log(res.data)
      callback(res.data);
    })
    .catch(err => {
      // console.log(err)
    });
}
var Net = {
  NetPost,
  NetGet
};
export default Net;
