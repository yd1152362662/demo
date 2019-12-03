/*
 * @Author: yangdan
 * @Date: 2019-10-24 15:56:49
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-28 10:44:14
 * @Description: 添加描述
 */
import { asyncRoutes, constantRoutes1 } from "@/router";

import router from "../../router";

const state = {
  routes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes;
  }
};

const actions = {
  generateRoutes({ commit }, type) {
    console.log("type", type);
    return new Promise(resolve => {
      let accessedRoutes;
      if (parseInt(type) === 1) {
        const arr = constantRoutes1;
        arr.forEach(item => {
          const res = router.options.routes.find(
            arrItem => arrItem.path === item.path
          );
          if (!res) {
            router.options.routes.push(item);
          }
        });
        console.log("this.$router.options.routes1", router.options.routes);
        router.addRoutes(router.options.routes);
        accessedRoutes = router.options.routes;
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      } else {
        const arr = asyncRoutes;
        arr.forEach(item => {
          const res2 = router.options.routes.find(
            arrItem => arrItem.path === item.path
          );
          if (!res2) {
            router.options.routes.push(item);
          }
        });
        console.log("this.$router.options.routes2", router.options.routes);
        router.addRoutes(router.options.routes);
        accessedRoutes = router.options.routes;
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      }
    });
  },
  destroyedRoutes({ commit }, type) {
    console.log("注销了store");
    return new Promise(resolve => {
      let accessedRoutesDestroyed;
      if (parseInt(type) === 1) {
        const arrDeleteByKey = router.options.routes;
        const arr1 = constantRoutes1;

        arr1.forEach(item => {
          arrDeleteByKey.forEach((item1, index) => {
            if (item1.path === item.path) {
              arrDeleteByKey.splice(index, 1);
            }
          });
        });
        router.options.routes = arrDeleteByKey;
        router.addRoutes(router.options.routes);
        accessedRoutesDestroyed = router.options.routes;
        console.log("this.$router.options.routes1", router.options.routes);
        commit("SET_ROUTES", accessedRoutesDestroyed);
        resolve(accessedRoutesDestroyed);
      } else {
        const arrDeleteByKey = router.options.routes;
        const arr1 = asyncRoutes;
        arr1.forEach(item => {
          arrDeleteByKey.forEach((item1, index) => {
            if (item1.path === item.path) {
              arrDeleteByKey.splice(index, 1);
            }
          });
        });
        router.options.routes = arrDeleteByKey;
        router.addRoutes(router.options.routes);
        accessedRoutesDestroyed = router.options.routes;
        console.log("this.$router.options.routes2", router.options.routes);
        commit("SET_ROUTES", accessedRoutesDestroyed);
        resolve(accessedRoutesDestroyed);
      }
    });
  },
  changeRoutes({ commit }, type) {
    let Index;
    router.options.routes.forEach((item,index) => {
      if (item.children && item.children != "undefined") {
        item.children.forEach((item)=>{
            if(item&&item.name=="创建订单") {
              Index=index
            }
        })
      }
    });
    if (parseInt(type) === 1) {
      router.options.routes[Index].children[0].hidden = false;
      router.options.routes[Index].children[1].hidden = true;
      router.options.routes[Index].children[0].meta.disabled = false;
      router.options.routes[Index].children[1].meta.disabled = true;
    } else if (parseInt(type) === 2) {
      router.options.routes[Index].children[0].hidden = true;
      router.options.routes[Index].children[1].hidden = false;
      router.options.routes[Index].children[0].meta.disabled = true;
      router.options.routes[Index].children[1].meta.disabled = false;
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
