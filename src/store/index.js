import Vue from 'vue';
import Vuex from 'vuex';
import ratary from './modules/ratary';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ratary
  }
});