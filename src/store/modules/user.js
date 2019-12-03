/*
 * @Author: yangdan
 * @Date: 2019-09-19 18:20:19
 * @LastEditors: yangdan
 * @LastEditTime: 2019-11-28 09:25:50
 * @Description: 添加描述
 */
import { login, logout, getInfo, getVerificationCode } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
  erpShow: false
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_erpShow: (state, erpShow) => {
    state.erpShow = erpShow;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log("userInfo", userInfo);
    const { username, password, type, phone, verificationCode } = userInfo;
    return new Promise((resolve, reject) => {
      if (parseInt(type) === 1) {
        login({ phone: phone, verificationCode: verificationCode })
          .then(response => {
            const { data } = response;
            // commit("SET_TOKEN", data.token);
            // setToken(data.token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      } else if (parseInt(type) === 2) {
        login({ username: username.trim(), password: password })
          .then(response => {
            const { data } = response;
            commit("SET_TOKEN", data.token);
            setToken(data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { roles, name, avatar, introduction } = data;

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + "-token";

      commit("SET_TOKEN", token);
      setToken(token);

      const { roles } = await dispatch("getInfo");

      resetRouter();

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch("permission/generateRoutes", roles, {
        root: true
      });

      // dynamically add accessible routes
      router.addRoutes(accessRoutes);

      // reset visited views and cached views
      dispatch("tagsView/delAllViews", null, { root: true });

      resolve();
    });
  },
  getVerificationCode({ commit }, verificationCode) {
    console.log("verificationCode", verificationCode);
    // return new Promise((resolve, reject) => {
    //   getVerificationCode(verificationCode)
    //     .then(response => {
    //       resolve(response);
    //     })
    //     .catch(error => {
    //       reject(error);
    //     });
    // });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
