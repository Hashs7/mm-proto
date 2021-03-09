<template>
  <header>
    <div class="user" v-if="isAuth && user">{{ user.username }}</div>
  </header>
</template>

<script>
  import { ref, inject } from 'vue';
  import { useResult, useQuery } from "@vue/apollo-composable";
  import gql from "graphql-tag";

  export default {
    name: "Header",
    setup() {
      const socket = inject('socket');
      console.log(socket)
      const { result } = useQuery(gql`
          query getUser {
            me {
              id,
              username,
            }
          }
        `);
      const user = useResult(result);
      const isAuth = ref(!user.value);

      return {
        isAuth,
        user,
      }
    }
  }
</script>

<style scoped>

</style>