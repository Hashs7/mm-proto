<template>
  <header>
    <div class="user" v-if="isAuth"></div>
  </header>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import { useResult } from "@vue/apollo-composable";
  import { useQuery } from "@apollo/client";
  import gql from "graphql-tag";

  export default {
    name: "Header",
    setup() {
      const isAuth = ref(false);

/*      const { result } = useQuery(gql`
        query getUser {
          me {
            id,
            username,
          }
        }
      `);*/

      function checkIsAuth() {

      }

      // onMounted(() => checkIsAuth());
	    // const user = useResult(result);
	    // console.log(user);
      return {
        isAuth,
	      // user,
      }
    }
  }
</script>

<style scoped>

</style>