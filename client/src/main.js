import { createApp } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { authMiddleware } from './helpers/auth';
import store from './store'

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
	link: authMiddleware.concat(httpLink),
  cache,
});

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(store)
  .use(router)
  .mount('#app');
