async function findUser(username, room) {
	try {
		const userExists = await strapi.services.users.find({ username, room });
		return userExists;
	} catch(err) {
		console.log("error while fetching", err);
	}
}

async function createUser({ username, room, status, socketId }) {
	try {
		const user = await strapi.services.users.create({
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

module.exports = {
	findUser,
	createUser
};