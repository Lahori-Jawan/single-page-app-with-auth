import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from '@/config/axios'
import { TokenService } from '@/services/Token'

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    user: null,
    message: ''
  },

  getters: {
    isLoggedIn: state => !!state.user
  },
  
  mutations: {

    SET_USER(state, data) {
      state.user = data
    },

    SET_NOTIFICATION(state, message) {
      state.message = message
    }

  },
  
  actions: {

    async Signup({ commit, state }, credentials) {
      console.log({credentials})
      try {
        const { status, data: { message, data: user } } = await axios.post('/api/auth/signup', { ...credentials });
        console.log({user})
        commit('SET_USER', user);
        commit('SET_NOTIFICATION', message);
        TokenService.setToken(user.token);
      } catch (error) {
        console.log('error', error);
      }
    },

    async Login({ commit, state }, credentials) {
      try {
        const { status, data: { message, user } } = await axios.post('/api/auth/login', { ...credentials });
        commit('SET_USER', user);
        commit('SET_NOTIFICATION', message);
        TokenService.setToken(user.token);
      } catch (error) {
        console.log('error', error);
      }
    },

    async Logout({ commit }, message = 'Logged out') {
      try {
        // await axios.post('/api/auth/logout');
        TokenService.clearStorage();
        commit('SET_USER', null);
        commit('SET_NOTIFICATION', message);
      } catch (error) {
        console.log('logout error', error);
      }
    },

  },

  modules: {}

})