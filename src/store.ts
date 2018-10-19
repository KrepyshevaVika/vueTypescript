import Vue from 'vue'
import Vuex, { StoreOptions, MutationTree, Module, ActionTree, GetterTree } from 'vuex'
import { IRootState, INode } from './types'
import { getAllNodes } from './services/service';

Vue.use(Vuex)

const GET_SUCCESS = 'GET_SUCCESS';
const MESSAGE_ERROR = 'MESSAGE_ERROR';

const state: IRootState = {
  nodes: [],
  infoAboutNode: {},
  messageError: "",
};

const actions: ActionTree<IRootState, IRootState> = {
  getAll({ commit }): any {
    getAllNodes().then((data: Array<INode>) => {
      commit('GET_SUCCESS', data);
    }).catch((error: string) => {
      commit('MESSAGE_ERROR', error);
    });
  }
};

const mutations: MutationTree<IRootState> = {
  [GET_SUCCESS] (state, nodes: Array<INode>) {
    console.log(nodes)
    state.nodes = nodes;
    console.log(state.nodes)
  },
  [MESSAGE_ERROR] (state, msgError: string) {
    state.messageError = msgError;
  },
};

const getters: GetterTree<IRootState, IRootState> = {
  all(state): Array<INode> {
      const { nodes } = state;
      return nodes;
  }
};
/*
export const module: Module<IRootState, IRootState> = {
  actions,
  getters,
 // state,
  mutations
};*/

const store: StoreOptions<IRootState> = {
  state,
  actions,
  mutations,
  getters,
 /* modules: {
    module
  }*/
};

export default new Vuex.Store<IRootState>(store);