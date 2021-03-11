// const strapi = require('strapi');

async function findUser(username, room) {
	try {
		const userExists = await strapi.services['chat-user'].find({ username, room });
		return userExists;
	} catch(err) {
		console.log("error while fetching", err);
	}
}

async function createUser({ username, room, status, socketId }) {
	try {
		const user = await strapi.services['chat-user'].create({
			username,
			room,
			status: status,
			socketId
		});
		return user;
	} catch(err) {
		console.log("User couldn't be created. Try again!")
	}
}

async function userExists(id) {
	try {
		const user = await strapi.services['chat-user'].findOne({ id: id });
		return user;
	} catch(err) {
		console.log("Error occured when fetching user", err);
	}
}

module.exports = {
	findUser,
	createUser,
	userExists
};