<template>
  <header>
    <div class="user" v-if="isAuth && user">{{ user.username }}</div>
  </header>
</template>

<script>
  import { computed } from "vue";
  import { useStore } from "vuex";

  export default {
    name: "Header",
    setup() {
      const { state } = useStore();
      const user = computed(() => state.user);
      const isAuth = computed(() => state.isAuth);
	    console.log(user.value);

      return {
        isAuth,
        user,
      }
    }
  }
</script>