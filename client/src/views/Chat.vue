<template>
  <div class="create">
    <h1>Chat</h1>
    <form @submit="submit" v-if="!entered">
      <div class="form__group">
        <label for="room">Enter room</label>
        <input type="text" v-model="room" id="room">
      </div>
      <button type="submit">Join room</button>
    </form>
    <div v-else>
      <span>Connecté</span>
    </div>
  </div>
</template>

<script>
  import { ref, getCurrentInstance } from 'vue';
  import { useStore } from "vuex";

  export default {
    name: 'Create',
    setup() {
	    const socket = getCurrentInstance().appContext.config.globalProperties.$socket;
      const room = ref('');
      const entered = ref(false);
      const { state } = useStore();

      async function submit(e) {
        e.preventDefault();
        if (!state.isAuth || !room.value) return;

        socket.emit('join', { username: state.user.username, room: room.value }, (err) => {
	        console.log('connected res ');
          if(err) {
	          console.log(err);
          } else {
            socket.on('welcome', (data) => {
	            console.log('welcome', data);
	            entered.value = true;
            });
          }
        });
      }

	    socket.on('welcome', (data) => {
		    console.log("Welcome event inside JoinRoom", data);
	    });

      return {
	      room,
	      entered,
        submit,
      }
    }
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
</style>