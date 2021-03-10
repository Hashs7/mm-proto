import { createStore } from 'vuex'
import gql from "graphql-tag";

export default createStore({
  state: {
  	isAuth: false,
  	user: null,
  },
  mutations: {
  	setIsAuth(state, value) {
		  state.isAuth = value;
	  },
  	setUser(state, value) {
		  state.user = value;
		  console.log(value, 'setuser');
	  }
  },
  actions: {
	  async initStore({ commit, dispatch }) {
		  try {
			  dispatch('getUser');
		  } catch (e) {
			  console.error(e);
		  }
	  },

	  async getUser({ commit }) {
		  const { data } = await this.$apollo.query({
			  query: gql`
          query getUser {
            me {
              id,
              username,
            }
          }
			  `
		  });
			commit('setIsAuth', !!data.me);
			commit('setUser', data.me);
	  }
  },
  modules: {
  }
})
