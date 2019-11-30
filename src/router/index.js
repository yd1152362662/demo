/*
 * @Author: yangdan
 * @Date: 2019-11-30 14:28:59
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-30 15:20:18
 * @Description: 添加描述
 */
import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
// import Layout from "@/layout";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index"),
    }
  ]
});
