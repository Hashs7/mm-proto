<template>
  <div class="create">
    <h1>Log in</h1>
    <form @submit="submit" >
      <div class="form__group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email">
      </div>
      <div class="form__group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password">
      </div>
      <button type="submit">Log in</button>
    </form>
    <button type="submit" @click="logout">Log out</button>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useMutation } from '@vue/apollo-composable';
  import gql from 'graphql-tag'
  import AuthService from '@/helpers/auth';

  export default {
    name: 'Create',
    setup() {
      const email = ref('');
      const password = ref('');

      const { mutate: userLoginInput } = useMutation(gql`
        mutation login($input: UsersPermissionsLoginInput!) {
          login(input: $input) {
            jwt,
            user {
              id,
            },
          }
        }
      `);

      function logout() {
	      console.log('logged out');
      	AuthService.deleteJWT();
      }

      async function submit(e) {
        e.preventDefault();
        try {
          const res = await userLoginInput({
            input: {
              identifier: email.value,
              password: password.value,
            },
          });
          AuthService.setJWT(res.data.login.jwt);
          console.log('logged', res);
        } catch (e) {
          console.error(e);
        }
      }

      return {
        email,
        password,
        submit,
	      logout,
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