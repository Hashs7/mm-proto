import { createApp } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import AuthService from './helpers/auth';
import store from './store'

const vueSocket = new VueSocketIO({
	debug: true,
	connection: SocketIO('http://localhost:1337'),
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_',
	},
});

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:1337/graphql',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
	// link: httpLink,
	link: AuthService.authMiddleware().concat(httpLink),
  cache,
});

const app = createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(store)
  .use(router)
	.use(vueSocket)
	.mount('#app');

store.$app = app;
store.$apollo = apolloClient;
store.dispatch('initStore');
