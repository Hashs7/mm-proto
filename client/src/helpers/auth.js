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
			if (token) {
				operation.setContext({
					headers: {
						authorization: `Bearer ${token}`
					}
				})
			}

			return forward(operation)
		})
	}
}

export default new AuthService();