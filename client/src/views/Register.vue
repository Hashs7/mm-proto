<template>
  <div class="create">
    <h1>Sign up</h1>
    <form @submit="submit" >
      <div class="form__group">
        <label for="username">Username</label>
        <input type="text" v-model="username" id="username">
      </div>
      <div class="form__group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email">
      </div>
      <div class="form__group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password">
      </div>
      <button type="submit">Sign up</button>
    </form>
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
      const username = ref('');
      const email = ref('');
      const password = ref('');

      const { mutate: userRegisterInput } = useMutation(gql`
        mutation register($input: UsersPermissionsRegisterInput!) {
          register(input: $input) {
            jwt,
            user {
                id,
            },
          }
        }
      `);

      async function submit(e) {
        e.preventDefault();
        try {
          const res = await userRegisterInput({
            input: {
              username: username.value,
              email: email.value,
              password: password.value,
            },
          });
          console.log('signed up', res);
          AuthService.setJWT(res.data.register.jwt);
        } catch (e) {
          console.error(e);
        }
      }

      return {
        username,
        email,
        password,
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