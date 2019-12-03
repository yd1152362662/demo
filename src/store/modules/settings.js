/*
 * @Author: yangdan
 * @Date: 2019-12-02 15:20:41
 * @LastEditors: yangdan
 * @LastEditTime: 2019-12-02 16:50:29
 * @Description: 添加描述
 */
// import variables from '@/styles/element-variables.scss';
import defaultSettings from '@/settings';

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
  theme:'#1890ff',
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

