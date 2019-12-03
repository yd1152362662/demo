/*
 * @Author: yangdan
 * @Date: 2019-11-30 14:28:59
 * @LastEditors: yangdan
 * @LastEditTime: 2019-12-02 15:27:52
 * @Description: 添加描述
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import VueAMap from 'vue-amap';
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德key
  key: '9091d50c4c3fb27ab7030f21c9cb60f3',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geocoder', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.MarkerClusterer', 'DistrictExplorer'],
  v: '1.4.15',
  uiVersion: '1.0.11'
});

// 全局loading
import Loading from '@/components/loading/loading.js';
Vue.use(Loading);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
