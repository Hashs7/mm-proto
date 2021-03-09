import { ApolloLink } from "@apollo/client";

class AuthService {
  constructor() {}

  getJWT() {
    return JSON.parse(localStorage.getItem('jwt'));
  }

  setJWT(token) {
    localStorage.setItem('jwt', JSON.stringify(token));
  }

  deleteJWT() {
	  localStorage.removeItem('jwt');
  }

	authMiddleware() {
  	return new ApolloLink((operation, forward) => {
			// add the authorization to the headers
			const token = this.getJWT();
			operation.setContext({
				headers: {
					authorization: token ? `Bearer ${token}` : null
				}
			});

			return forward(operation)
		})
	}
}

const instance = new AuthService();

export const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	const token = instance.getJWT();
	console.log(token, token ? `Bearer ${token}` : null);
	if (token) {
		operation.setContext({
			headers: {
				authorization: `Bearer ${token}`
			}
		})
	}

	return forward(operation)
});

export default instance;