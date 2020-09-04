// state
const state = {
  saveDepartid: {
    // departId: ""   // 首页存储科室id
  }
};

// mutations
const mutations = {
  mttsaveDepartid(state, params) {
    const { saveDepartid } = state;
    state.saveDepartid = Object.assign({}, saveDepartid, params);
  }
};
const actions={
  saveStoreDepartId({ commit }, obj) {
    commit('mttsaveDepartid', obj)
  }
} 

export default {
  namespaced: true,
  state,
  mutations,
  actions
};