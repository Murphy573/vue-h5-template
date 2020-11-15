/**
 * 用户登录
 */
import { api_logout, api_login_byUnified, api_query_userInfo } from '../../apis/basic';
import MyStorage from '../../utils/storage';
import { phoneFormatter } from '../../filters/global';
import { getToken, setToken, removeToken } from '@/utils/auth';

// 会话中不清除的session
const DONNOT_SESSION_CLEAR_KEYS = ['WX_APPID', 'WX_OPENID'];

export default {
  state: {
    token: getToken() || '',
    userInfo: null,
    // 是否展示登录面板
    showLoginPanel: false,
    permissions: []
  },
  mutations: {
    SET_TOKEN (state, token = '') {
      if (!token) {
        removeToken();
      }
      else {
        setToken(token);
      }
      state.token = token;
    },
    SET_USERINFO (state, userInfo = null) {
      if (!userInfo) {
        removeToken();
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
    },
    vx_gt_GetPermissions (state) {
      return state.permissions;
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
        if (!loginParams) {
          return Promise.reject(new Error('login params missing'));
        }
        const _res = await api_login_byUnified(loginParams);
        // 设置token
        dispatch('vx_ac_SetToken', _res);
        // 获取用户信息
        await dispatch('vx_ac_GetUserInfo');
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
        dispatch('vx_ac_FrontendLogout');
        api_logout();
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
        let _userInfo = await api_query_userInfo();
        if (!_userInfo) {
          dispatch('vx_ac_FrontendLogout');
          return Promise.reject(new Error('getUserInfo error, then clear storage!'));
        }
        _userInfo.nickName =
          _userInfo.nickName || phoneFormatter(_userInfo.mobile || '');

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
