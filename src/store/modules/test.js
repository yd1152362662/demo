/*
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-12 16:41:57
 * @Description: 添加描述
 */
import { testAddress } from '@/api/test';
import { asyncRoutes, constantRoutes } from '@/router';

const state = {
  routes: [],
  addRoutes: [],
  pagination: {
    currentPage: 1,
    size: 10,
    total: 40
  }
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
  SET_pagination: (state, pagination) => {
    const temp = state.pagination;
    state.pagination = Object.assign(temp, pagination);
  }
};

const actions = {
  testAddress({ commit }, { parentCode }) {
    console.log('parentCode', parentCode);
    return new Promise((resolve, reject) => {
      testAddress({ parentCode }).then(res => {
        resolve(res);
      });
    });
  },
  generateRoutestest({ commit }) {
    const accessedRoutes = asyncRoutes;
    commit('SET_ROUTES', accessedRoutes);
  },
  changePagination({ commit }, pagination) {
    console.log('pagination123', pagination);
    commit('SET_pagination', pagination);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
