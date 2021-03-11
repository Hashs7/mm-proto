'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#bootstrap
 */
const {
	findUser,
	userExists,
	createUser
} = require('./utils/database');

module.exports = () => {
	const io = require('socket.io')(strapi.server, {
		cors: {
			origin: "http://localhost:8080",
			methods: ["GET", "POST"],
			allowedHeaders: ["my-custom-header"],
			credentials: true
		}
	});
	io.on('connection', (socket) => {
		socket.on('join', async({ username, room }, callback) => {
			try {
				const userExists = await findUser(username, room);

				if(userExists.length > 0) {
					callback(`User ${username} already exists in room no${room}. Please select a different name or room`);
				} else {
					const user = await createUser({
						username: username,
						room: room,
						status: "ONLINE",
						socketId: socket.id
					});

					if(user) {
						socket.join(user.room);
						socket.emit('welcome', {
							user: 'bot',
							text: `${user.username}, Welcome to room ${user.room}.`,
							userData: user
						});
						socket.broadcast.to(user.room).emit('message', {
							user: 'bot',
							text: `${user.username} has joined`,
						});

					} else {
						callback(`user could not be created. Try again!`)
					}
				}
				// callback();
			} catch(err) {
				console.log("Err occured, Try again!", err);
			}
		});

		socket.on('sendMessage', async(data, callback) => {
			console.log(data);
			try {
				const user = await userExists(data.userId);
				console.log();
				if(user) {
					console.log('emit', data.text);
					// io.to(user.room).emit('message', {

					socket.broadcast.to(user.room).emit('message', {
						user: user.username,
						text: data.text,
					});
				} else {
					callback(`User doesn't exist in the database. Rejoin the chat`)
				}
				// callback();
			} catch(err) {
				console.log("err inside catch block", err);
			}
		});

	});
};