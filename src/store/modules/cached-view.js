/**
 *  页面缓存管理
 */
const INITIAL = ['Main', 'MainHome', 'MainCategory', 'MainMy'];

export default {
  state: {
    cachedViews: INITIAL.slice()
  },
  mutations: {
    ADD_CACHED_VIEW (state, componentName) {
      state.cachedViews.push(componentName);
    },
    REMOVE_CACHED_VIEW (state, componentName) {
      let _index = state.cachedViews.indexOf(componentName);
      if (_index >= 0) {
        state.cachedViews.splice(_index, 1);
      }
    },
    CLEAR_CACHED_VIEW (state) {
      state.cachedViews = [];
    }
  },
  getters: {
    vx_gt_GetCachedViews (state) {
      return state.cachedViews;
    }
  },
  actions: {
    vx_ac_AddCachedView ({ commit, state }, componentName) {
      if (!componentName) return;
      !state.cachedViews.includes(componentName) &&
        commit('ADD_CACHED_VIEW', componentName);
    },
    vx_ac_RemoveCachedView ({ commit, state }, componentName) {
      if (!componentName) return;
      state.cachedViews.includes(componentName) &&
        commit('REMOVE_CACHED_VIEW', componentName);
    },
    vx_ac_ClearCachedView ({ commit }) {
      commit('CLEAR_CACHED_VIEW');
    },
    // 移除Home缓存
    vx_ac_RemoveHomeCache ({ dispatch }) {
      INITIAL.forEach(v => dispatch('vx_ac_RemoveCachedView', v));
    },
    // 添加home缓存
    vx_ac_AddHomeCache ({ dispatch }) {
      INITIAL.forEach(v => dispatch('vx_ac_AddCachedView', v));
    }
  }
};
