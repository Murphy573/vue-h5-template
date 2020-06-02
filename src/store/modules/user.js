/**
 * 用户登录
 */
import { api_logout, api_login_byUnified } from '../../apis/basic';
import MyStorage from '../../utils/storage';
import { phoneFormatter } from '../../filters/global';

const TOKEN_KEY = 'SESSION_TOKEN';
const USERINFO_KEY = 'SESSION_USERINFO';
// 会话中不清除的session
const DONNOT_SESSION_CLEAR_KEYS = ['WX_APPID', 'WX_OPENID'];

export default {
  state: {
    token: MyStorage.localStorage.getItem(TOKEN_KEY) || '',
    userInfo: null,
    // 是否展示登录面板
    showLoginPanel: false
  },
  mutations: {
    SET_TOKEN (state, token = '') {
      if (!token) {
        MyStorage.localStorage.removeItem(TOKEN_KEY);
      }
      else {
        MyStorage.localStorage.setItem(TOKEN_KEY, token);
      }
      state.token = token;
    },
    SET_USERINFO (state, userInfo = null) {
      if (!userInfo) {
        MyStorage.localStorage.removeItem(TOKEN_KEY);
        MyStorage.localStorage.removeItem(USERINFO_KEY);
      }
      else {
        MyStorage.localStorage.setItem(USERINFO_KEY, JSON.stringify(userInfo));
      }
      state.userInfo = userInfo;
    },
    SET_SHOWLOGINPANEL (state, showLoginPanel = false) {
      state.showLoginPanel = showLoginPanel;
    }
  },
  getters: {
    vx_gt_getToken (state) {
      return state.token;
    },
    vx_gt_getUserInfo (state) {
      return state.userInfo;
    },
    vx_gt_showLoginPanel (state) {
      return state.showLoginPanel;
    }
  },
  actions: {
    vx_ac_SetToken ({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    vx_ac_SetUserInfo ({ commit }, userInfo) {
      commit('SET_USERINFO', userInfo);
    },
    vx_ac_SetShowLoginPanel ({ commit }, showLoginPanel) {
      commit('SET_SHOWLOGINPANEL', showLoginPanel);
    },
    // 统一登录
    async vx_ac_Login ({ dispatch }, loginParams) {
      try {
        if (!loginParams) return;
        const _res = await api_login_byUnified(loginParams);
        // 设置token
        _res.userInfo.nickName =
          _res.userInfo.nickName || phoneFormatter(loginParams.phone || '');
        dispatch('vx_ac_SetToken', _res.token);
        dispatch('vx_ac_SetUserInfo', _res.userInfo);
        return _res;
      }
      catch (error) {
        return Promise.reject(error);
      }
    },
    // 前端退出登录
    vx_ac_FrontendLogout ({ dispatch }) {
      // 清除缓存：主要是为了防止切换用户，以前的缓存造成数据错误
      const _allSessionStorages = MyStorage.sessionStorage.getAll();
      Object.keys(_allSessionStorages).forEach(key => {
        // 不清除指定的缓存
        if (!DONNOT_SESSION_CLEAR_KEYS.includes(key)) {
          MyStorage.sessionStorage.removeItem(key);
        }
      });
      MyStorage.localStorage.clear();
      // 重置登陆token和userinfo
      dispatch('vx_ac_SetToken');
      dispatch('vx_ac_SetUserInfo');
    },
    // 退出登录
    async vx_ac_Logout ({ dispatch }) {
      try {
        await api_logout();
        dispatch('vx_ac_FrontendLogout');
        return true;
      }
      catch (error) {
        dispatch('vx_ac_FrontendLogout');
        return Promise.reject(error);
      }
    },
    // 获取用户信息
    async vx_ac_GetUserInfo ({ dispatch }) {
      try {
        const _userInfo = JSON.parse(
          MyStorage.localStorage.getItem(USERINFO_KEY)
        );
        dispatch('vx_ac_SetUserInfo', _userInfo);
        return _userInfo;
      }
      catch (error) {
        dispatch('vx_ac_FrontendLogout');
        return Promise.reject(error);
      }
    }
  }
};
