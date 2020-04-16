import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user';
import CachedView from './modules/cached-view';
import ThirdAccess from './modules/third-access';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    User,
    CachedView,
    ThirdAccess
  }
});

export default store;
