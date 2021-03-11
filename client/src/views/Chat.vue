<template>
  <div class="create">
    <h1>Chat</h1>
    <form @submit="submit">
      <div class="form__group">
        <label for="username">Enter username</label>
        <input type="text" v-model="username" id="username">
      </div>
      <div class="form__group">
        <label for="room">Enter room</label>
        <input type="text" v-model="room" id="room">
      </div>
      <button type="submit">Join room</button>
    </form>
    <div class="create" v-if="entered">
      <span>Room : {{ room }}</span>
      <div class="container">
        <span class="message" v-for="(m, i) in messages" :key="i">{{ m.user }}: {{ m.text }}</span>
      </div>
      <div>
        <input type="text" v-model="text">
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Create',
    sockets: {
    	welcome({ userData }) {
		    console.log('welcome', userData);
		    // this.$store.commit('setChatUserId', userData.id);
		    this.entered = true;
		    this.userData = userData;
        // this.$router.push({ name: 'CHAT_ROOM', params: { id: userData.room }});
      },
	    message(data) {
    		this.messages.push(data);
	    }
    },
	  data() {
		  return {
			  userData: null,
			  username: '',
			  room: '',
			  entered: false,
			  text: '',
			  messages: [],
		  }
	  },
	  methods: {
		  submit(e) {
			  e.preventDefault();
			  if (!this.username|| !this.room) return;
			  this.$socket.emit('join', { username: this.username, room: this.room });
		  },
		  sendMessage() {
			  this.$socket.emit('sendMessage', {
				  userId: this.userData.id,
				  text: this.text,
			  })
		  }
	  },
  }
</script>

<style lang="scss">
  .form__group {
    max-width: 300px;
    margin: 0 auto 16px auto;

    label {
      text-align: left;
      display: block;
    }

    input {
      width: 100%;
    }
  }

  .container {
    width: 500px;
    min-height: 500px;
    margin: auto;
    border: 1px solid gray;
    text-align: left;
  }
  .message {
    display: block;
  }
</style>