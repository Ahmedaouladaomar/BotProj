import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    connected_users: []
  },

  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      } 
    })
  ],

  computed: {
    user() {
      return this.state.user;
    },
    token() {
      return this.state.token;
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    setUser(context){
      context.commit('setUser')
    },
    setToken(context){
      context.commit('setToken')
    }

  },
  getters: {
    isLoggedIn(state) {
      return state.token
    },
  }
})
